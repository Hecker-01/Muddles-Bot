const { Client, ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   */
  async getCards(client, interaction, userID) {
    var sql = `SELECT * FROM cards WHERE userID = ?`;
    var result;
    var cards = [];
    client.dbConnection.query(sql, [userID], function (err, queryResult) {
      if (err) {
        console.error(err);
        return interaction.reply({
          content: "An error occurred while fetching your cards.",
          ephemeral: true,
        });
      }
      if (queryResult.length === 0) {
        return interaction.reply({
          content: "You have no cards.",
          ephemeral: true,
        });
      }
      result = queryResult;
      for (card in result) {
        cardID = result[card].cards;
        cards.push("- " + cardID + " (" + getRarity(cardID) + ")");
      }
    });
    return cards;
  },

  getRarity: function (client, interaction, cards) {
    var sql = `SELECT * FROM users WHERE userID = ? LIMIT 1`;
    var result;
    var cards = [];
    client.dbConnection.query(sql, [cards], function (err, queryResult) {
      if (err) {
        console.error(err);
        return interaction.reply({
          content: "An error occurred while fetching your cards.",
          ephemeral: true,
        });
      }
      if (queryResult.length === 0) {
        return;
      }
      result = queryResult;
      return result[0].rarity;
    });
  },
};
