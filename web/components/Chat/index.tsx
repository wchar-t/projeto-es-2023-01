import { useEffect, useRef, useState } from 'react';
import { Button } from '@chakra-ui/react';
import ChatClient from '@/lib/chat';
import styles from '@/styles/components/Chat.module.css';
import Icon from '../Icon';
import Message from './message';
import { Message as ChatMessage } from '@/interfaces/client/chat';

export default function Chat({
  username,
}: {
  username: string,
}) {
  const messageRef = useRef<HTMLInputElement>(null);
  const client = new ChatClient(username);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  async function sendMessage() {
    if (!messageRef.current) return;
    const message = messageRef.current.value || '';

    await client.sendMessage(message);
    messageRef.current.value = '';
  }

  function onMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message]);
  }

  useEffect(() => {
    client.onmessage = onMessage;
  }, []);

  return (
    <div className={styles['chat-wrapper']}>
      <div className={styles.chat}>
        <div className={styles.header}>
          <div className={styles.close}>
            <Icon name="arrow-right-from-line" />
          </div>
          <div className={styles['chat-title']}>
            CHAT DA TRANSMISSÃO
          </div>
          <div className={styles.users}>
            <Icon name="users" />
          </div>
        </div>

        <div className={styles.content}>
          {messages.map((message) => (
            <Message
              key={message.id}
              color={'#ff0000'}
              username={message.author.username}
              message={message.content}
            />
          ))}
        </div>

        <div className={styles.control}>
          <div className={styles.input}>
            <input type="text" placeholder="Envie uma mensagem..." ref={messageRef} onKeyUp={(e) => (e.keyCode === 13 ? sendMessage() : undefined)} />
          </div>
          <div className={styles.subcontrols}>
            <div> </div>
            <div className={styles.right}>
              <div className={styles['generic-button']}>
                <Icon name="cog" />
              </div>
              <Button type="button" colorScheme="green" size="sm" onClick={() => sendMessage()}>Chat</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
