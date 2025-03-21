const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check the bot's latency.")
    .setContexts("Guild"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const ping = new EmbedBuilder()
      .setTitle("**🏓 Pong!**")
      .setDescription(
        `Latency | ${
          Date.now() - interaction.createdTimestamp
        }ms.\nAPI Latency | ${Math.round(client.ws.ping)}ms`
      )
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      );

    interaction.reply({
      content: "",
      embeds: [ping],
      ephemeral: false,
    });
  },
};
