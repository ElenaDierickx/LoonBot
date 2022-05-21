const { Client, Intents } = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(token);