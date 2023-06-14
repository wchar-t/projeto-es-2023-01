import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Chat from '@/components/Chat';
import Page from '@/components/Page';
import styles from '@/styles/Channel.module.css';
import Api from '@/lib/api';
import Link from 'next/link';
import StreamTag from '@/components/StreamTag';

declare const jwplayer: any;

export default function Channel() {
  const router = useRouter();
  const videoRef = useRef<HTMLDivElement>(null);
  const { username } = router.query;
  const me = Api.session!;

  // todo: stream and tags from db
  const title = 'STREAM ACONTECENDO! DB!!!!'; // from db
  const tags = ['Esports', 'VCT', 'English', 'Game']; // from db
  const { picture } = me; // from db
  const { bio } = me; // from db

  const url = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4';

  useEffect(() => {
    jwplayer(videoRef.current).setup({
      file: url,
      width: '100%',
      height: '100%',
      aspectratio: '16:9',
      autostart: true,
    });
  }, []);

  return (
    <Page padding={0}>
      <div className={styles.channel}>
        <div className={styles.content}>
          <div className={styles.video}>
            <div ref={videoRef} />
          </div>
          <div className={styles.details}>
            <div className={styles.thumbnail}>
              <img src={picture} />
              <span className={styles.live}>AO VIVO</span>
            </div>
            <div className={styles.info}>
              <div className={styles.top}>
                <Link href={`/c/${username}`}>{username}</Link>
              </div>
              <div className={styles.title}>
                { title }
              </div>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <StreamTag key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles['bio-wrapper']}>
            <div className={styles.bio}>
              <h3>Sobre {username}</h3>
              {bio || 'Vish... parece que o streamer não tem uma bio ainda'}
            </div>
          </div>
        </div>
        <Chat username={username as string} />
      </div>
    </Page>
  )
}
