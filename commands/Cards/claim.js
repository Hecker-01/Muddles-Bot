const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");
const { updateUserCredit } = require("../../Functions/database");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Claim a card.")
    .setContexts("Guild")
    .addSubcommand((subcommand) =>
      subcommand.setName("cards").setDescription("Claim a card.")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("credit").setDescription("Claim a credit.")
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const claim = interaction.options.getSubcommand();

    const complete = new EmbedBuilder()
      .setTitle("Claimed")
      .setColor(
        parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
      );

    switch (claim) {
      case "cards":
        complete.setDescription("You have claimed a card.");
        break;
      case "credit":
        complete.setDescription(
          `You have successfully claimed your daily 50 credit, your credit score is now ${await updateUserCredit(
            interaction.user,
            50
          )}.`
        );
        break;
    }
    interaction.reply({ content: "", embeds: [complete] });
  },
};
