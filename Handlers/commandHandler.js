const { loadFiles } = require("../Functions/fileLoader");

async function loadCommands(client) {
  console.time("Commands Loaded");

  client.commands = new Map();
  const commands = [];

  const files = await loadFiles("Commands");

  for (const file of files) {
    try {
      const command = require(file);
      if (command.data && command.data.name && command.data.description) {
        client.commands.set(command.data.name, command);
        commands.push({ Command: command.data.name, Status: "✅" });
      }
    } catch (error) {
      console.error(`Error loading command ${file}:`, error);
      commands.push({
        Command: file.split("/").pop().slice(0, -3),
        Status: "❌",
      });
    }
  }

  const validCommands = commands
    .filter((cmd) => cmd.Status === "✅")
    .map((cmd) => client.commands.get(cmd.Command).data.toJSON());
  await client.application.commands.set(validCommands);

  console.table(commands, ["Command", "Status"]);
  console.info("\n\x1b[36m%s\x1b[0m", "Loaded Commands.");
  console.timeEnd("Commands Loaded");
}

module.exports = { loadCommands };
