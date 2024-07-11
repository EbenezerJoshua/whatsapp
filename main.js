const fs = require('fs');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const SESSION_FILE_PATH = './session.json';

// Load session data if it exists
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

let clientid = "client-one";

const client = new Client({
    puppeteer: {
        headless: false, // false makes the browser visible. If you close the browser, the session will get closed
        args: [ '--no-sandbox', '--disable-gpu', ],
    },
    authStrategy: new LocalAuth({
        clientId: `${clientid}` // Identifier for the client
    })
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
    if (message.body === 'mices') {
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
