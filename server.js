require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    telegram: {
        response: 'KKomrade Telegram channel - https://t.me/+kI-TFIPbOesyMDhi KKomrade'
    },
    chatex :{
        response: 'KKomrade Extension for emotes - https://chrome.google.com/webstore/detail/7tv/ammjkodgmmoknidbanneddgankgfejfh KKomrade '
    },
}

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},
	channels: [ 'Riabiki' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

    const [raw, command, argument] = message.match(regexpCommand);

    const { response } = commands[command] || {};

    if ( typeof response === 'function' ) {
        client.say(channel, response(tags.username));
    } 
    else if (typeof response === 'string') {
        client.say(channel, response);
    }

   
    // if ( command ) {
    //     client.say(channel, `Command ${command} found with argument ${argument}`)
    // }
});
					