const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const dbConnection = require("./Database/db");

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});
module.exports = { client };

const { loadEvents } = require("./Handlers/eventHandler");

require("dotenv").config();
client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.credit = new Array();
client.dbConnection = dbConnection;

loadEvents(client);

client.login(process.env.TOKEN);
