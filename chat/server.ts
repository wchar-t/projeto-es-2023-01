import WebSocket, { WebSocketServer } from 'ws';
import { Message, User } from './interfaces';
import BotFamily from './twitch';

type ops = 'auth' | 'welcome' | 'join' | 'message' | 'error';

class Client {
  public user?: User;
  public channel: string;
  private ws: WebSocket.WebSocket;

  constructor(user: User, ws: WebSocket.WebSocket, channel: string) {
    this.user = user;
    this.ws = ws;
    this.channel = channel;
  }

  async send(op: ops, d: any, cb?: () => void) {
    return this.ws.send(JSON.stringify({
      op,
      d,
    }), cb);
  }

  async close() {
    return this.ws.close();
  }

  async auth(jwt: string) {
    const { error, result } = await fetch(`${process.env.AUTH_SERVICE_URL}/api/jwt/${jwt}`).then(e => e.json());

    if (error)
      return false;

    this.user = result;
    return true;
  }

  async join(channel: string) {
    this.channel = channel;
    console.log(`Client (${this.user?.username}) joined channel ${this.channel}`);
  }
}

export default class Server {
  public host: string;
  public port: number;
  public clients: Client[] = [];
  public wss: WebSocketServer;
  public bots: BotFamily[];
  
  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.wss = new WebSocketServer({
      host: this.host,
      port: this.port,
    });
    this.bots = [];

    this.wss.on('connection', (ws) => this.onConnection(ws));

    console.log(`Listening on ${this.host}:${this.port}`);
  }

  async closeClient(client: Client) {
    return client.close();
  }

  onConnection(ws: WebSocket.WebSocket) {
    const client = new Client(null, ws, '');
    this.clients.push(client);
    
    ws.on('message', async (message) => await this.onPayload(client, message));
    ws.on('close', () => this.onClose(client));
  }

  onClose(client: Client) {
    console.log(`Client (${client.user?.username}) disconnected on channel ${client.channel}`);
    this.clients = this.clients.filter(e => e !== client);
  }

  async onPayload(client: Client, data: WebSocket.RawData) {
    let op: ops, d: any;
    
    try {
      const payload = JSON.parse(data.toString());
      ({ op, d } = payload);

      if (!op || !d) {
        return client.send('error', 'Invalid payload', () => this.closeClient(client));
      }
    } catch(_) {
      return this.closeClient(client);
    }
    
    if (!client.user && op !== 'auth') {
      return client.send('error', 'Not authenticated', () => this.closeClient(client));
    }

    if (op === 'auth'){
      if (!(await client.auth(d)))
        return client.send('error', 'Invalid session', () => this.closeClient(client));
      else
        return client.send('welcome', `Welcome, ${client.user.username}!`);
    } else if (op === 'join') {
      const botsInChannel = this.bots.filter(e => e.channel === d);

      if (botsInChannel.length == 0) this.bots.push(new BotFamily(this, d));
      
      client.join(d);
    }
    else if (op === 'message') {
      const message: Message = {
        id: `${(new Date().getTime())}_${client.user.username}`,
        color: d.color || null,
        author: client.user,
        content: d.content,
        channel: client.channel,
      };
      return this.broadcast(message);
    }
  }

  async broadcast(message: Message) {
    if (!message.content)
      return;
    
    for (const client of this.clients) {
      if (client.channel === message.channel && client.channel /* && client.user.id !== message.author.id*/) {
        client.send('message', message);
      }
    }
  }

  async broadcastTo(channel: string, message: Message) {
    if (!message.content)
      return;
      
    for (const client of this.clients) {
      if (client.channel === channel && client.channel /* && client.user.id !== message.author.id*/) {
        client.send('message', message);
      }
    }
  }
}
