const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cookie")
    .setDescription("Give someone a cookie.")
    .setContexts("Guild")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to give a cookie to.")
        .setRequired(false)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || null;
    const cookieEmbed = new EmbedBuilder()
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      )
      .setTitle("You've earned a cookie!")
      .setTimestamp()
      .setImage(
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Z3bGRueWNsNms1ZGdqOHdoeXI2aXdjZmFpYzgyNnBjZzJwZWI2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ptKqEC4VYVtWhmjQIF/giphy.gif"
      );
    if (user) {
      cookieEmbed.setDescription(
        `${interaction.user} thinks ${user} deserves a cookie, because they did such a good job!`
      );
    } else {
      cookieEmbed.setDescription(
        `${interaction.user} thinks you deserve a cookie :thumbsup:, because you did such a good job!`
      );
    }

    interaction.reply({ content: "", embeds: [cookieEmbed] });
  },
};
