const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();
const commands = [];

function loadFiles(directoryPath, type) {
  if (!fs.existsSync(directoryPath)) {
    console.error(`[ERROR] Directory '${directoryPath}' does not exist. ❌`);
    return [];
  }

  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.js'));

  files.forEach(file => {
    console.log(`[DEBUG] Loaded ${type} '${file}' ✅`);
  });

  return files;
}

// Load Commands (with logging)
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = loadFiles(commandsPath, 'command');
for (const file of commandFiles) {
  try {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    console.log(`[DEBUG] Command '${command.data.name}' has been loaded successfully. ✅`);
  } catch (err) {
    console.error(`[ERROR] Error loading command file '${file}': ❌`, err);
  }
}
console.log('[DEBUG] Loaded commands:', commands);

// Register Commands Globally
const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('[DEBUG] Started refreshing application (/) commands... 🔄');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('[DEBUG] Successfully reloaded application (/) commands. ✅');
  } catch (error) {
    console.error('[ERROR] Failed to register commands: ❌', error);
  }
})();

// Load Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = loadFiles(eventsPath, 'event');
for (const file of eventFiles) {
  try {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
      console.log(`[DEBUG] Event '${event.name}' is set to execute once. ✅`);
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      console.log(`[DEBUG] Event '${event.name}' is set to execute on every occurrence. ✅`);
    }
  } catch (err) {
    console.error(`[ERROR] Error loading event file '${file}': ❌`, err);
  }
}

client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
  console.log('[DEBUG] Bot logged in successfully. ✅');
}).catch(err => {
  console.error('[ERROR] Bot failed to log in: ❌', err);
  process.exit(1);
});

// Anti-crash protection
process.on('unhandledRejection', error => {
  console.error('[ERROR] Unhandled promise rejection: ❌', error.message);
  // Attempt to restart the bot on unhandled rejection
  client.login(process.env.DISCORD_BOT_TOKEN).catch(err => {
    console.error('[ERROR] Bot failed to restart: ❌', err);
  });
});

process.on('SIGINT', () => {
  console.log('[DEBUG] Received shutdown command... 🔄');
  console.log('[DEBUG] Starting shutdown process...');
  client.destroy()
    .then(() => {
      console.log('[DEBUG] Successfully logged out... ✅');
      console.log('[DEBUG] Bot shut down successfully... 🔌');
      process.exit(0);
    })
    .catch(err => {
      console.error('[ERROR] Failed to log out: ❌', err);
      process.exit(1);
    });
});