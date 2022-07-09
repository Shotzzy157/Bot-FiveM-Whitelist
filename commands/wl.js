const Discord = require('discord.js')
require('dotenv').config()
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
  });
  connection.connect();
module.exports.run = async(client, message, args, member) => {
  const channel = await message.guild.channels.create(`whitelist_${message.author.username}`); //Arguments to set the channel name
  message.guild.channels.create(channel, {
          type: "text", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
          permissionOverwrites: [
             {
               id: message.guild.roles.everyone, //To make it be seen by a certain role, user an ID instead
               allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'], //Allow permissions
               deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
         }
          ],
        })
   channel.send(`Qual seu nome?`).then(m2 => { 
    let nome = channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c => {
      channel.bulkDelete(1);
        titulo = c.content
        
        m2.edit(`Qual seu sobrenome?`).then(m3 => {
          let sobrenome = channel.createMessageCollector(x => message.author.id === message.author.id, { //Aqui criamos o message collector
            max: 1
        }).on('collect', c => {
          channel.bulkDelete(1);
                descrição = c.content

                m3.edit(`Qual o seu id?`).then(m3 => {
                  let id = channel.createMessageCollector(x => message.author.id === message.author.id, { //Aqui criamos o message collector
                    max: 1
                }).on('collect', c => {
                  channel.bulkDelete(1);
                        thumb = c.content

                                connection.query("SELECT id FROM vrp_users WHERE id =?", thumb, function (err, result) {
                                  if (err){console.log(err);}
                                
                                
                                  
                                if(result.length > 0){
                                  connection.query("UPDATE vrp_users SET whitelisted=1 WHERE id=?",thumb, function (err, result) {
                                    if (err){console.log(err);}
                                    const person = message.member
                                    person.roles.add('882444453632151602')
                                  channel.send(`Setando cargos`)

                                message.member.setNickname(`${titulo} ${descrição} | ${thumb}`)

                                setTimeout(() => {
                                  channel.delete()
                                         }, 100)
                                })}
                                else if(result.length === 0){
                                  channel.send('Esse usuário não existe!')
                                  setTimeout(() => {
                                    channel.delete()
                                           }, 2000)
                                }
                                }

    
                            )
                        })
                    })
                })
            })
        }
        )
      } 
  )}
                                