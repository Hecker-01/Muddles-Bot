const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("freakify")
    .setDescription("Make a user a FREAKY.")
    .setContexts("Guild")
    .addStringOption((option) =>
      option
        .setName("freaky_name")
        .setDescription("Choose a freaky name.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to make a FREAKY.")
        .setRequired(true)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const freaky_name = interaction.options.getString("freaky_name");
    const user = interaction.options.getUser("user");
    var content;

    if (interaction.user.id === client.config.ownerID) {
      content = `${freaky_name}, <@${user.id}>\n`;
    }

    const soon = new EmbedBuilder()
      .setTitle("**Coming Soon!**")
      .setDescription("Freakifying users is not available yet.")
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      );

    interaction.reply({
      content: `${content}`,
      embeds: [soon],
      ephemeral: false,
    });
  },
};
