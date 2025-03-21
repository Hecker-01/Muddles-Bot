const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
} = require("discord.js");

module.exports = {
  developer: true,
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
      updateCredit(client.credit, interaction.user.id, 1);
      var credit = getUserCredit(client.credit, interaction.user.id);
      soon.setDescription(
        "Successfully claimed 1 credit, you now have " + credit + " credit."
      );
    } else {
      soon.setDescription("Claiming cards is not available yet.");
    }
    interaction.reply({ content: "", embeds: [soon] });
  },
};

function updateCredit(usersArray, userid) {
  // Try to find the user
  let user = usersArray.find((u) => u.userid === userid);

  // If the user doesn't exist, add them
  if (!user) {
    user = { userid, credit: 0 };
    usersArray.push(user);
    console.log(`User added:`, user);
  } else {
    console.log(`User found:`, user);
  }

  // Increment the user's credit
  user.credit++;
  usersArray[usersArray.indexOf(user)] = user;

  return user;
}

function getUserCredit(usersArray, userid) {
  const user = usersArray.find((u) => u.userid === userid);
  if (user) {
    return user.credit;
  } else {
    console.log(`User with ID ${userid} not found.`);
    return null; // Or you can return 0 or another default value
  }
}
