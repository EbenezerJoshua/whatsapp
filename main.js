const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

let userID = "dad"

const client = new Client({
    puppeteer: {
        headless: true, // false makes the browser visible. If you close the browser, the session will get closed
        args: [ '--no-sandbox', '--disable-gpu', ],
    },
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', },
    authStrategy: new LocalAuth ({
        clientId: `${userID}`,
    }),
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
    console.log("QR Received!!", qr);
});

client.on('message_create', message => {
	console.log(message.body);
    console.log(message.from);
    console.log(message.to);
    console.log(message.id.id);
    if (message.body === 'hi') {
		message.reply('Hellow');
	}
    if (message.body === 'Hi') {
        message.react("😍");
    }
    if (message.body === 'mice') {
        message.delete(true)
    }
});


client.on('message', async (msg) => {
    const mentions = await msg.getMentions();
    
    for (let user of mentions) {
        console.log(`${user.pushname} was mentioned`);
    }
});


client.initialize();
