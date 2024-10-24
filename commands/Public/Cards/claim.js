const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim a card.")
    .setContexts("Guild")
    .addStringOption((option) =>
      option
        .setName("claim")
        .setDescription("Choose what to claim.")
        .setRequired(false)
        .addChoices(
          { name: "Cards", value: "cards" },
          { name: "Credit", value: "credit" }
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const claim = interaction.options.getString("claim");

    const soon = new EmbedBuilder()
      .setTitle("**Coming Soon!**")
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      );

    if (claim === "cards") {
      soon.setDescription("Claiming cards is not available yet.");
    } else if (claim === "credit") {
      soon.setDescription("Claiming social credit is not available yet.");
    } else {
      soon.setDescription("Claiming cards is not available yet.");
    }
    interaction.reply({ content: "", embeds: [soon], ephemeral: false });
  },
};
