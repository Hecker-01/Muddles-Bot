const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> Oops an internal error occurred!"
          )
          .setDescription("Please report this to <@766897363050037248>!")
          .setColor(0xff0000);
        interaction.reply({
          content: "",
          embeds: [Error],
          flags: MessageFlags.Ephemeral,
        });
        console.log(
          `\'${interaction.member.user.tag}\' caused an error! Errorcode: cmd-${interaction.commandName}`
        );
      }

      if (command.developer && interaction.user.id !== client.config.ownerID) {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> You do not have permission to use this command!"
          )
          .setDescription(
            "If you think this is a mistake, please report this to <@766897363050037248>!"
          )
          .setColor(0xff0000);
        interaction.reply({
          content: "",
          embeds: [Error],
          flags: MessageFlags.Ephemeral,
        });
        return;
      } else {
        command.execute(interaction, client);
      }
    } else if (interaction.isButton()) {
      const Error = new EmbedBuilder()
        .setTitle(
          "<:wrong:1298349564708917320> Oops an internal error occurred!"
        )
        .setDescription("Please report this to <@766897363050037248>!")
        .setColor(0xff0000);
      interaction.reply({
        content: "",
        embeds: [Error],
        flags: MessageFlags.Ephemeral,
      });
      console.log(
        `\'${interaction.member.user.tag}\' caused an error! Errorcode: btn-${interaction.customId}`
      );
    } else if (interaction.isStringSelectMenu()) {
      const Error = new EmbedBuilder()
        .setTitle(
          "<:wrong:1298349564708917320> Oops an internal error occurred!"
        )
        .setDescription("Please report this to <@766897363050037248>!")
        .setColor(0xff0000);
      interaction.reply({
        content: "",
        embeds: [Error],
        flags: MessageFlags.Ephemeral,
      });
      console.log(
        `\'${interaction.member.user.tag}\' caused an error! Errorcode: smnu-${interaction.customId}-[${interaction.values}]`
      );
    }
  },
};
