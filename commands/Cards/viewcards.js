const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
} = require("discord.js");
const { getCards } = require("../../Functions/cardStuff");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("viewcards")
    .setDescription("View your cards.")
    .setContexts("Guild")
    .addStringOption((option) =>
      option
        .setName("rarity")
        .setDescription("Choose the rarity of the cards to view.")
        .setRequired(false)
        .addChoices(
          { name: "Common", value: "common" },
          { name: "Uncommon", value: "uncommon" },
          { name: "Rare", value: "rare" },
          { name: "Epic", value: "epic" },
          { name: "Legendary", value: "legendary" },
          { name: "Mythic", value: "mythic" },
          { name: "Divine", value: "divine" },
          { name: "Bot", value: "bot" },
          { name: "Unknown", value: "unknown" }
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    interaction.deferReply();
    const cards = await getCards(client, interaction, interaction.user.id);
    interaction.reply({
      content: `Your cards:\n${cards.join("\n")}`,
    });

    /*
    const rarity = interaction.options.getString("rarity");
    if (!rarity) {
      const cards = new EmbedBuilder()
        .setTitle("Your Cards")
        .setColor(
          parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
        )
        .addFields(
          {
            name: "All",
            value: "0",
            inline: true,
          },
          {
            name: "Common",
            value: "0",
            inline: true,
          },
          {
            name: "Uncommon",
            value: "0",
            inline: true,
          },
          {
            name: "Rare",
            value: "0",
            inline: true,
          },
          {
            name: "Epic",
            value: "0",
            inline: true,
          },
          {
            name: "Legendary",
            value: "0",
            inline: true,
          },
          {
            name: "Mythic",
            value: "0",
            inline: true,
          },
          {
            name: "Divine",
            value: "0",
            inline: true,
          },
          {
            name: "Bot",
            value: "0",
            inline: true,
          }
        );

      const rarityActionRow = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("viewcards_rarity")
          .setPlaceholder("Select a rarity")
          .addOptions(
            new StringSelectMenuOptionBuilder()
              .setLabel("All")
              .setValue("all")
              .setEmoji("1302995506213163058"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Common")
              .setValue("common")
              .setEmoji("1302995561238237265"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Uncommon")
              .setValue("uncommon")
              .setEmoji("1302995543168909403"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Rare")
              .setValue("rare")
              .setEmoji("1302995609971851426"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Epic")
              .setValue("epic")
              .setEmoji("1302995602686218300"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Legendary")
              .setValue("legendary")
              .setEmoji("1302995595061100595"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Mythic")
              .setValue("mythic")
              .setEmoji("1302995584587796490"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Divine")
              .setValue("divine")
              .setEmoji("1302995569769316373"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Bot")
              .setValue("bot")
              .setEmoji("1302995577604145183"),
            new StringSelectMenuOptionBuilder()
              .setLabel("Unknown")
              .setValue("unknown")
              .setEmoji("1302995553117933648")
          )
      );

      interaction.reply({
        content: "",
        embeds: [cards],
        components: [rarityActionRow],
      });
    } else {
      const cards = new EmbedBuilder()
        .setTitle(`Your ${rarity} Cards`)
        .setColor(
          parseInt(client.config.defaultEmbedColor.replace(/^#/, "0x"), 16)
        )
        .setDescription("You have no cards of this rarity.");
    }
    */
  },
};
