const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType, Client } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    client.user.setPresence({
      activities: [{ name: "over Site Mudkip", type: ActivityType.Watching }],
      status: "online",
    });

    console.log(`Logged in as ${client.user.tag}!`);

    loadCommands(client);
  },
};
