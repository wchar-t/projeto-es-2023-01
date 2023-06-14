/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { Message } from '@/interfaces/client/chat';
import Api from './api';

type ops = 'auth' | 'welcome' | 'join' | 'message' | 'error';

export default class ChatClient {
  private static host = 'ws://localhost:20001'; // from dotenv
  private ws: WebSocket;
  private username: string;
  public onmessage: (message: Message) => void;

  constructor(username: string) {
    this.username = username;

    this.ws = new WebSocket(ChatClient.host);
    this.ws.onopen = () => {
      this.send('auth', Api.getToken());
    }
    this.ws.onmessage = (data: MessageEvent) => this.onWSMessage(data);
    this.ws.onclose = () => ChatClient.onWSClose();
    this.onmessage = () => {};
  }

  private async send(op: ops, d: unknown) {
    return this.ws.send(JSON.stringify({
      op,
      d,
    }));
  }

  private onPayload(op: ops, d: unknown) {
    if (op === 'welcome') {
      this.send('join', this.username);
    } else if (op === 'message') {
      this.onmessage(d as Message);
    }
  }

  private onWSMessage(raw: MessageEvent) {
    const { op, d } = JSON.parse(raw.data);
    this.onPayload(op, d);
  }

  private static onWSClose() {
    console.log('Connection closed');
  }

  public async sendMessage(content: string | object) {
    await this.send('message', { content });
  }
}
