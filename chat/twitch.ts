import { WebSocket } from 'ws';
import Server from './server';

// zombie chat
// will spam

export default class BotFamily {
  channel: string;
  ws: WebSocket;
  server: Server;
  digits: number;

  constructor(server: Server, channel: string) {
    console.log('Bot spawned:', channel);

    this.channel = channel;
    this.server = server;
    this.ws = new WebSocket('wss://irc-ws.chat.twitch.tv/', {
      headers: {
        origin: 'https://www.twitch.tv',
      },
    });
    this.digits = Math.floor(Math.random() * (88888 - 55555) + 55555);
    
    this.ws.on('open', () => this.onWebSocketOpen());
    this.ws.on('message', (e) => this.onWebSocketMessage(e));
  }

  onWebSocketOpen() {
    this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
    this.ws.send('PASS SCHMOOPIIE');
    this.ws.send(`NICK justinfan${this.digits}`);
    this.ws.send(`USER justinfan${this.digits} 8 * :justinfan${this.digits}`);
    this.ws.send(`JOIN #${this.channel}`);
  }

  onWebSocketMessage(e) {
    let data = '';
    
    try {
      data = e.toString ? e.toString() : e.data.toString();
    } catch (e) {
      console.log('BotFamily exception: ', e);
    }
    
    const parts = data.split(':');
    
    if (parts.length !== 3 || !data.includes('color='))
      return;

    const color = data.split('color=')[1].split(';')[0]
    const content = parts[2].trim();
    const name = parts[1].split('!')[0].trim();

    this.server.broadcastTo(this.channel, {
      id: `${(new Date().getTime())}_${name}`,
      author: {
        id: '-1',
        username: name,
        createdAt: new Date(),
        email: 'email@nomail.com',
        picture: '',
      },
      content: content,
      channel: this.channel,
      color: color,
    });
  }
}