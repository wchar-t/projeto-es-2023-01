import Link from 'next/link';
import Head from 'next/head';

import Chat from '@/components/Chat';
import Page from '@/components/Page';

import styles from '../styles/Stream.module.css';

export default function Stream() {
  return (
    <>
      <Head>
        <title>LS :: TRANSMISSÃO DO luisss</title>
      </Head>
      <Page padding={0}>
        <main className={styles.stream}>
          <div className={styles.stream__player}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

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
            </div>
          </div>
          <Chat />
        </main>
      </Page>
    </>
  );
}
