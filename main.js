const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { db, doc, setDoc, getDoc } = require('./firebaseConfig');

const clientId = 'user123';

class FirebaseStore {
    constructor(clientId) {
        this.clientId = clientId;
    }

    async sessionExists({ session }) {
        try {
            const sessionRef = doc(db, 'whatsappSessions', `${this.clientId}_${session}`);
            const sessionDoc = await getDoc(sessionRef);
            return sessionDoc.exists();
        } catch (error) {
            console.error('Error in sessionExists:', error);
            throw error;
        }
    }

    async getSession({ session }) {
        try {
            const sessionRef = doc(db, 'whatsappSessions', `${this.clientId}_${session}`);
            const sessionDoc = await getDoc(sessionRef);
            if (sessionDoc.exists()) {
                return sessionDoc.data();
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error in getSession:', error);
            throw error;
        }
    }

    async setSession({ session, data }) {
        try {
            const sessionRef = doc(db, 'whatsappSessions', `${this.clientId}_${session}`);
            if (data && typeof data === 'object') {
                await setDoc(sessionRef, data);
            } else {
                console.error('Invalid session data:', data);
                throw new Error('Session data must be an object');
            }
        } catch (error) {
            console.error('Error in setSession:', error);
            throw error;
        }
    }

    async removeSession({ session }) {
        try {
            const sessionRef = doc(db, 'whatsappSessions', `${this.clientId}_${session}`);
            await setDoc(sessionRef, {});
        } catch (error) {
            console.error('Error in removeSession:', error);
            throw error;
        }
    }

    async save({ session, data }) {
        return this.setSession({ session, data });
    }
}

const store = new FirebaseStore(clientId);

const authStrategy = new RemoteAuth({
    clientId,
    store,
    backupSyncIntervalMs: 60000, // 1 minute
});

const client = new Client({
    authStrategy
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR Received:', qr);
});

client.on('authenticated', (session) => {
    console.log('Authenticated:', session);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', message => {
    console.log(message.body);
    console.log(message.from);
    console.log(message.to);
    console.log(message.id.id);
    if (message.body === 'hi') {
        message.reply('Hello');
    }
    if (message.body === 'Hi') {
        message.react("😍");
    }
    if (message.body === 'mice') {
        message.delete(true);
    }
});

client.initialize();





















// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');

// let userID = "dad"

// const client = new Client({
//     puppeteer: {
//         headless: true, // false makes the browser visible. If you close the browser, the session will get closed
//         args: [ '--no-sandbox', '--disable-gpu', ],
//     },
//     webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', },
//     authStrategy: new LocalAuth ({
//         clientId: `${userID}`,
//     }),
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
//     console.log("QR Received!!", qr);
// });

// client.on('message_create', message => {
// 	console.log(message.body);
//     console.log(message.from);
//     console.log(message.to);
//     console.log(message.id.id);
//     if (message.body === 'hi') {
// 		message.reply('Hellow');
// 	}
//     if (message.body === 'Hi') {
//         message.react("😍");
//     }
//     if (message.body === 'mice') {
//         message.delete(true)
//     }
// });


// client.on('message', async (msg) => {
//     const mentions = await msg.getMentions();
    
//     for (let user of mentions) {
//         console.log(`${user.pushname} was mentioned`);
//     }
// });


// client.initialize();
