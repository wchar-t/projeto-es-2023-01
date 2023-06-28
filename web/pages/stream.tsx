import Link from 'next/link';
import Head from 'next/head';

import { useEffect, useRef } from 'react';
import Chat from '@/components/Chat2';
import Page from '@/components/Page';
import CountdownVideo from '@/components/CountdownVideo';

import styles from '../styles/Stream.module.css';
import useStream from '@/hooks/useStream';

export default function Stream() {
  const { isStreaming, stream } = useStream()
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stream && videoRef.current && isStreaming) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, videoRef.current, isStreaming])
  return (
    <>
      <Head>
        <title>LS :: TRANSMISSÃO DO luisss</title>
      </Head>
      <Page padding={0}>
        <main className={styles.stream}>
          <div className={styles.stream__player}>
            <video controls muted ref={videoRef} className="w-full aspect-video" />
            <div className={styles.stream__info}>
              <img
                src="https://static-cdn.jtvnw.net/jtv_user_pictures/e7224153-007a-4606-9c1b-46ad395e3000-profile_image-70x70.png"
                className={styles.stream__info_avatar}
              />
              <div className={styles.stream__info_description}>
                <h1 className="hover:underline">
                  <Link href="/perfil/luisss">luisss</Link>
                </h1>
                <h2>🛠️ Construindo uma aplicação em nextJs</h2>
                <ul className="flex gap-2 text-xs font-normal">
                  <li>
                    Programação
                  </li>
                  <li>
                    Javascript
                  </li>
                  <li>NextJs</li>
                </ul>
              </div>
              
              <CountdownVideo/>
            </div>
          </div>
          <Chat />
        </main>
      </Page>
    </>
  );
}
