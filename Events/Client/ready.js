const { loadCommands } = require("../../Handlers/commandHandler");
const { ActivityType, Client } = require("discord.js");
module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    var activityType = ActivityType.Playing;
    switch (client.config.activityType) {
      case "PLAYING":
        activityType = ActivityType.Playing;
        break;
      case "WATCHING":
        activityType = ActivityType.Watching;
        break;
      case "LISTENING":
        activityType = ActivityType.Listening;
        break;
      case "STREAMING":
        activityType = ActivityType.Streaming;
        break;
    }
    client.user.setPresence({
      activities: [{ name: client.config.activityName, type: activityType }],
      status: client.config.activitiesStatus,
    });

    console.log(`Logged in as ${client.user.tag}!`);

    loadCommands(client);
  },
};
