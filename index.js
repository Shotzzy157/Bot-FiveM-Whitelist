const { readFileSync } = require('fs')
const Discord = require("discord.js");
const configuration = require('./configuration.json');
require('dotenv').config()
const fs = require("fs");
const color = require("colors");
const client = new Discord.Client({partials: ["MESSAGE, USER, REACTION"]});
const config = require("./configuration.json");
client.config = config;

console.log(readFileSync( './assets/output.txt', 'utf8').toString())

  console.log(color.green('[ARC_BOT_JS] -'), color.blue('Se você tiver alguma dúvida sobre como usá-lo, visite nosso discord: https://discord.gg/YDmbap49bJ'))
  console.log(color.green('[VERSÃO] -')+`BETA`)
  console.log(color.green('[CREDITS] -')+` Total créditos ao Thunderte#1057!`)
  console.log(color.yellow('[WARN] -')+` Não é permitido que se tire os créditos!`)

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0]
      console.log(color.green('[COMANDO] -'+` ${commandName} carregado`))
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  let status = [
      `seu status`,
    ],
    teste = 0;
  setInterval( () => client.user.setActivity(`${status[teste++ % status.length]}`, {
        type: "PLAYING" //mais tipos: WATCHING / LISTENING
      }), 1000 * 30); 
  client.user
      .setStatus("online")
      .catch(console.error);
});

  client.on("message", msg => {
    if(msg.content === `<@!${client.user.id}>`)
    msg.channel.send(`${configuration.prefix}help`) 
  });

  console.log(color.green('[DEVELOPER] -')+('Thunderte#1057')) 
client.login(process.env.TOKEN);
