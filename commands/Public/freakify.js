const sharp = require("sharp");
const { createCanvas, loadImage } = require("@napi-rs/canvas");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("freakify")
    .setDescription("Make a user a FREAKY.")
    .addStringOption((option) =>
      option
        .setName("short_name")
        .setDescription("Choose a freaky name.")
        .setRequired(false)
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The user to make a FREAKY.")
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const fetch = (await import("node-fetch")).default;
    const member = interaction.options.getMember("member") || interaction.user;
    const shortName =
      interaction.options.getString("short_name") || member.displayName;

    const imageSize = 512;
    const stretchFactor = 1;

    await interaction.deferReply();

    try {
      const avatarUrl = member.displayAvatarURL({
        format: "png",
        size: imageSize,
      });
      const response = await fetch(avatarUrl);
      if (!response.ok) throw new Error("Failed to download avatar.");
      const avatarBuffer = Buffer.from(await response.arrayBuffer());

      // Resize and stretch both the avatar and overlay images
      const avatarImage = await sharp(avatarBuffer)
        .resize({
          width: imageSize,
          height: Math.floor(imageSize * stretchFactor),
        })
        .toBuffer();

      const path = require("path");
      const overlayImagePath = path.join(__dirname, "freaky.png");
      const overlayImage = await sharp(overlayImagePath)
        .resize({
          width: imageSize,
          height: Math.floor(imageSize * stretchFactor),
        })
        .toBuffer();

      // Combine the stretched avatar and overlay images
      const combinedImage = await sharp(avatarImage)
        .composite([{ input: overlayImage }])
        .toBuffer();

      // Create a canvas and load the combined image into it
      const canvas = createCanvas(
        imageSize,
        Math.floor(imageSize * stretchFactor)
      );
      const ctx = canvas.getContext("2d");
      const img = await loadImage(combinedImage);
      ctx.drawImage(img, 0, 0);

      // Add text to the canvas
      ctx.font = "48px sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(`${shortName} is calling`, canvas.width / 2, 80);

      // Export the final image
      const finalBuffer = canvas.toBuffer("image/png");

      // Send as attachment
      const attachment = new AttachmentBuilder(finalBuffer, {
        name: "freaky.png",
      });

      const Freaky = new EmbedBuilder()
        .setTitle("<:right:1298349511860551813> Here is your image!")
        .setDescription("Enjoy your FREAKY image!")
        .setFooter({
          text: `Requested by ${interaction.user.displayName}`,
          iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setImage("attachment://freaky.png")
        .setColor(
          parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
        );

      await interaction.followUp({
        content: `<@${interaction.user.id}>`,
        files: [attachment],
        embeds: [Freaky],
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      const Error = new EmbedBuilder()
        .setTitle(
          "<:wrong:1298349564708917320> Oops an internal error occurred!"
        )
        .setDescription("An error occurred while processing the image.")
        .setColor(0xff0000);
      await interaction.followUp({
        content: "",
        files: [],
        embeds: [Error],
        ephemeral: true,
      });
    }
  },
};
