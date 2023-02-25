const { Client, Events, GatewayIntentBits, SlashCommandBuilder, Intents, Collection } = require('discord.js');
const { token } = require('../config.json');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const functionFolder = fs.readdirSync('./src/functions');

for (const folder of functionFolder) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for(const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.login(token);