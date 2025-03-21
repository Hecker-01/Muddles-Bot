const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: false,
  data: new SlashCommandBuilder()
    .setName("feature")
    .setDescription("Set the status of a feature.")
    .setContexts("Guild")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("Choose what status to set.")
        .setRequired(true)
        .addChoices(
          { name: "Accepted", value: "accepted" },
          { name: "Denied", value: "denied" },
          { name: "Next version", value: "next_version" },
          { name: "Being worked on", value: "worked_on" },
          { name: "Done", value: "done" },
          { name: "Duplicate", value: "duplicate" },
          { name: "Needs work", value: "needs_work" }
        )
    )
    .addChannelOption((option) =>
      option
        .setName("dupicate_feature")
        .setDescription("Choose the post that this feature is a duplicate of.")
        .setRequired(false)
        .addChannelTypes(11)
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const forumPost = interaction.channel; // Assuming the command is run in a forum post channel

    if (forumPost.parentId !== "1302356650522579065") {
      const errorEmbed = new EmbedBuilder()
        .setTitle(
          "<:wrong:1298349564708917320> You can't run this command here!"
        )
        .setDescription(
          "This command can only be run in <#1302356650522579065>."
        )
        .setColor(0xff0000);
      interaction.reply({
        content: "",
        embeds: [errorEmbed],
      });
      return;
    }

    const status = interaction.options.getString("status");

    const statusEmbed = new EmbedBuilder();

    if (status === "accepted") {
      statusEmbed
        .setTitle(
          "<:gitpullrequestdraft:1287443440589733948> This feature has been accepted."
        )
        .setDescription(
          "This Feature has been accepted as a draft, and will be worked on in the future."
        )
        .setColor(0xfaa21c);
      forumPost.setAppliedTags(["1302667958711226479"]);
    } else if (status === "denied") {
      statusEmbed
        .setTitle(
          "<:gitpullrequestclosed:1287443418888278068> This feature has been denied."
        )
        .setDescription(
          "This Feature has been denied, and will not be worked on."
        )
        .setColor(0xff0000);
      forumPost.setAppliedTags(["1302668012020695060"]);
      forumPost.setLocked(true);
    } else if (status === "next_version") {
      statusEmbed
        .setTitle(
          "<:gitpullrequest:1287443396604071976> This feature has been accepted."
        )
        .setDescription(
          "This feature has been accepted, and will be in the next major version."
        )
        .setColor(0xfaa21c);
      forumPost.setAppliedTags(["1302668104006107216"]);
    } else if (status === "worked_on") {
      statusEmbed
        .setTitle(
          "<:gitmergequeue:1287443372352737280> This feature is being worked on."
        )
        .setDescription("This feature is currently being worked on.")
        .setColor(0xfaa21c);
      forumPost.setAppliedTags(["1302668221652009062"]);
    } else if (status === "done") {
      statusEmbed
        .setTitle(
          "<:gitmerge:1287443346977063034> This feature has been added."
        )
        .setDescription("This feature has been added and is now available.")
        .setColor(0x00ff00);
      forumPost.setAppliedTags(["1302668282377146470"]);
      forumPost.setLocked(true);
    } else if (status === "duplicate") {
      const duplicateFeature =
        interaction.options.getChannel("dupicate_feature");
      if (!duplicateFeature) {
        const errorEmbed = new EmbedBuilder()
          .setTitle(
            "<:wrong:1298349564708917320> You need to provide a duplicate feature post."
          )
          .setDescription(
            "Please provide the post that this feature is a duplicate of."
          )
          .setColor(0xff0000);
        interaction.reply({
          content: "",
          embeds: [errorEmbed],
        });
        return;
      }
      statusEmbed
        .setTitle("<:warning:1298349435981533226> This feature is a duplicate.")
        .setDescription(
          `This feature is a duplicate of ${duplicateFeature}, and will not be worked on.`
        )
        .setColor(0xffbc2c);
      forumPost.setAppliedTags(["1302668804018667530"]);
      forumPost.setLocked(true);
    } else if (status === "needs_work") {
      statusEmbed
        .setTitle(":factory_worker: This feature needs work.")
        .setDescription(
          "This feature needs more work before it can be accepted."
        )
        .setColor(0x56b3dd);
      forumPost.setAppliedTags(["1302703587834728508"]);
    } else {
      const Error = new EmbedBuilder()
        .setTitle(
          "<:wrong:1298349564708917320> Oops an internal error occurred!"
        )
        .setDescription("Please report this to <@766897363050037248>!")
        .setColor(0xff0000);
      interaction.reply({ content: "", embeds: [Error] });
      console.log(
        `\'${interaction.member.user.tag}\' caused an error! Errorcode: cmd-${interaction.commandName}`
      );
      return;
    }

    const owner = await forumPost
      .fetchStarterMessage()
      .then((message) => message.author);
    interaction.reply({
      content: `${owner}, the status of your feature has been updated.`,
      embeds: [statusEmbed],
    });
  },
};
