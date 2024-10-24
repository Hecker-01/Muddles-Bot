const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get the server invite.")
    .setContexts("Guild"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const invite = new EmbedBuilder()
      .setTitle("Server invite")
      .setDescription("The server invite is: **https://discord.gg/mudkip**")
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      );

    interaction.reply({ content: "", embeds: [invite], ephemeral: true });
  },
};
