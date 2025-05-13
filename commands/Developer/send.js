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
        .setColor(0x55b1dd)
        .setDescription(
          `1. The Members of the community are to obey discords terms of service.

2. The Member of the server will try to respect everyone and not start useless druma such as;
  2(A)-Behaving toxic, arguing for no reason, bringing drama/starting it in the server.
  2(B)-Participate in discriminatory behaviour of any kind such as racism, xenophobia, homophobia or any form of discrimination due to the persons upbringing, nationality, religion, place of birth, sexuality, identity or joke about such in an potentially offensive manner.
  2(C)-Promote discriminatory behaviour it doesnt matter if its politics or anything this is not the space for that.

3. People will not participate in NSFW Behavior and discuss it such as;
   3(A)-Participate in sexting, suggestive conversations, gifs, images, post nsfw content, talk about nsfw content or behavior.
   3(B)-Discuss, hint, joke on things like zoophilia, pedophilia or any other fetishes, suggestive content or text of such manner.
   if you for some reason believe a server member is a pedophile don't discuss it in public channels and report it through the ticket system.
   3(C)-Have NSFW profile pictures banners statuses or profiles.

4. People will not joke about or continue to discuss after someone asks them to stop about sensitive topic that might trigger/make other members uncomftarble such as;
   4(A) Recent or historical tragedies and events and people.
   4(2) Suicide, self harm this includes "kys" , "go die" "die" " end it" and other phrases with the same intent.
   4(3) Joking about ones disability or condition of any kind.

5. The Server is a community thats strictly only English you may only participate in conversations using the english language or in channels designated for such if they are in place if not then you musn't talk in other languages no matter what.

6. Do not impersonate other Members or staff no matter what.

7. Do not spam, flood the channels, mic spam, reaction spam in any way.

8. Do not advertise other communities or servers, social media of yours or any other stuff, you cant ask other member to follow you, send links and any other means to redirect people from the server to your social media or server in any text channel or vc channel.

9. The Staff has the final say in any matter disagreeing with a staff member and arguing with them can be and will be punished if you have any issues towords a staff member file a HR-ticket.

If nothing is done about messages older than one month, they will not be valid for punishment (unless the message is a serious offense)

All rules apply to all text and vc channels within the server and must be followed at all times.`
        )
        .setFooter({
          text: "Thank you for helping us keep the server clean!",
        });

      const rules3 = new EmbedBuilder()
        .setTitle("**Other Info:**")
        .setDescription(
          "Need help? Use /help to get some general assistance!\nIf that doesn't work, don't worry! Just head over to <#1240770769462759576> and open a ticket. Our team is here to help!"
        )
        .setColor(0x7291ed)
        .setFooter({ text: "We're here to make your experience awesome!" });

      channel.send({
        embeds: [rules1, rules3],
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
