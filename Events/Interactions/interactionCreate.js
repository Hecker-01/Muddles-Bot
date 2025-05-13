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
      } else {
        command.execute(interaction, client);
      }
    } else if (interaction.isButton()) {
      if (interaction.customId === "verify") {
        if (interaction.member.roles.cache.has("1241020745270952058")) {
          const done = new EmbedBuilder()
            .setTitle(
              "**<:warning:1298349435981533226> You have already been verified!**"
            )
            .setDescription(
              "**Things you might want to do:**\n\n• Get some cool roles in <id:customize>\n• Go chat in <#1240767844648489014>!"
            )
            .setColor(0xffbd2b);
          interaction.reply({
            content: "",
            embeds: [done],
            flags: MessageFlags.Ephemeral,
          });
        } else {
          const verified = new EmbedBuilder()
            .setTitle(
              "**<:right:1298349511860551813> You have been successfully verified!**"
            )
            .setDescription(
              "**Things you might want to do:**\n\n• Get some cool roles in <id:customize>\n• Go chat in <#1240767844648489014>!"
            )
            .setColor(0x01d169);
          interaction.member.roles.add("1241020745270952058");
          interaction.reply({
            content: "",
            embeds: [verified],
            flags: MessageFlags.Ephemeral,
          });
        }
      } else {
        const Error = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> Oops an internal error occurred!"
          )
          .setDescription(
            `Please report this to <@766897363050037248>: \`btn-${interaction.customId}\``
          )
          .setColor(0xff0000);
        interaction.reply({
          content: "",
          embeds: [Error],
          flags: MessageFlags.Ephemeral,
        });
        console.log(
          `\'${interaction.member.user.tag}\' caused an error! Errorcode: btn-${interaction.customId}`
        );
      }
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
