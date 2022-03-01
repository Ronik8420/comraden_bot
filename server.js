require('dotenv').config();

const tmi = require('tmi.js');

const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);

const commands = {
    telegram: {
        response: 'Telegram channel - https://t.me/+kI-TFIPbOesyMDhi'
    },
    ktowho: {
        response: 'AYAYA'
    },
    testo: {
        response: 'Рассыпчатое'
    }
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
					