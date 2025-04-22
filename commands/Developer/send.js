const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Send the rules or verify message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setContexts("Guild")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send.")
        .setRequired(true)
        .addChoices(
          { name: "Rules", value: "rules" },
          { name: "Verify", value: "verify" }
        )
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel send the message to.")
        .setRequired(true)
        .addChannelTypes(0)
    ),

  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Boolean} toggle - Toggle disable buttons
   * @param {string}[choice = null] choice - The color user chose
   */
  execute(interaction, client) {
    const message = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");

    if (message === "rules") {
      const rules1 = new EmbedBuilder()
        .setTitle("Server Rules")
        .setColor("#FF5733")
        .setDescription(
          "Please read the following rules to ensure a fun and respectful environment for everyone!"
        )
        .addFields(
          {
            name: "**1.** Discord's Terms of Service",
            value:
              "Make sure you're following [Discord's Terms of Service](https://discord.com/terms)!",
          },
          {
            name: "**2.** PG-13 Usernames & Statuses",
            value:
              "Usernames and statuses must be PG-13 (SFW).",
          },
          {
            name: "**3.** Keep It PG-13",
            value:
              "All messages should be PG-13! No NSFW content (links, images, videos), and please keep topics in their respective channels. Violating this will result in a 30-day ban.",
          },
          {
            name: "**4.** Respect Everyone",
            value:
              "Treat others with respect—no toxicity, arguing, or bringing drama.",
          },
          {
            name: "**5.** No Spam",
            value:
              "Spamming is a no-go! This includes emote spam, text walls, lyrics, caps, bot commands, and disrupting voice channels. Chain spamming is also prohibited.",
          },
          {
            name: "**6.** No Impersonation",
            value:
              "Don't impersonate anyone, bots, content creators, staff, or other users.",
          },
          {
            name: "**7.** No Unsolicited DMs",
            value:
              "Do not DM others without permission, and absolutely no advertising in DMs.",
          },
          {
            name: "**8.** Beware of Suspicious Links",
            value:
              "Avoid clicking or sending suspicious/unknown links. Violating this rule will result in a 30-day timeout.",
          },
          {
            name: "**9.** Staff Discretion",
            value:
              "Even if it's not explicitly mentioned in the rules, staff have the discretion to take action to maintain the server's well-being.",
          },
          {
            name: "**10.** Reporting Issues",
            value:
              "Got an issue or need to report a user? Open a ticket in <#1330218316773458002> and keep it out of the chat channels!",
          }
        )
        .setFooter({
          text: "Thank you for helping us keep the vibes positive! 🙌",
        });

      /*
      const rules2 = new EmbedBuilder()
        .setTitle(
          "<:new1A:1331297377318863032><:new2A:1331297395451105310> **Warning System:**"
        )
        .setDescription(
          "**2 Warns**: <:timeout:1331297927070748735> 30m timeout\n" +
            "**3 Warns**: <:timeout:1331297927070748735> 30m timeout\n" +
            "**4 Warns**: <:timeout:1331297927070748735> 30m timeout\n" +
            "**5 Warns**: <:timeout:1331297927070748735> 1h timeout\n" +
            "**6 Warns**: <:timeout:1331297927070748735> 6h timeout\n" +
            "**7 Warns**: <:timeout:1331297927070748735> 12h timeout\n" +
            "**8 Warns**: <:timeout:1331297927070748735> 1d timeout\n" +
            "**9 Warns**: <:timeout:1331297927070748735> 28d timeout\n" +
            "**10 Warns**: <:ban:1331297971966574682> Permanent ban"
        )
        .setColor(0xca0000)
        .setFooter({
          text: "Warnings are given for server violations. Let's keep the vibes positive! 🙌",
        });
      */

      const rules3 = new EmbedBuilder()
        .setTitle("**Other Info:**")
        .setDescription(
          "Need help? Use </help:1331293998345617484> to get some general assistance!\n" +
            "If that doesn't work, don't worry! Just head over to <#1330218316773458002> and open a ticket. Our team is here to help!"
        )
        .setColor(0x7291ed)
        .setFooter({ text: "We're here to make your experience awesome!" });

      channel.send({
        embeds: [rules1, rules2, rules3],
      });
      interaction.reply({
        content: "Rules sent!",
        flags: MessageFlags.Ephemeral,
      });
    } else if (message === "verify") {
      const verifyButton = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Verify")
          .setCustomId("verify")
          .setStyle(ButtonStyle.Success)
          .setDisabled(false)
          .setEmoji("1331296988574122084")
      );

      const verifyEmbed = new EmbedBuilder()
        .setTitle("**Accepting the Rules**")
        .setDescription("**To verify, please click the button below!**")
        .setColor(0x39f077)
        .setFooter({
          text: "By clicking 'Verify', you agree to follow the rules and understand the consequences for breaking them.",
        });

      channel.send({ embeds: [verifyEmbed], components: [verifyButton] });
      interaction.reply({
        content: "Verify message sent!",
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
