import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Chat from '@/components/Chat';
import Page from '@/components/Page';
import styles from '@/styles/Channel.module.css';
import Api from '@/lib/api';
import Link from 'next/link';
import StreamTag from '@/components/StreamTag';
import Twitch from '@/lib/twitch';

declare const jwplayer: any;
declare const window: any; // rm after demo

export default function Channel({
  streams, // rm after demo
  stream, // rm after demo
}: {
  streams: object[], // rm after demo
  stream: string, // rm after demo
}) {
  window.recommended = streams; // rm after demo
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
      file: stream || url, // rm after demo
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

// rm after demo
export async function getServerSideProps(ctx: any) {
  const { username } = ctx.query;
  const res = await Twitch.fetch({ operations: ['PersonalSections'] });
  const resStream = await Twitch.getStream(username);
  const props = { streams: [], stream: '' };

  try {
    props.streams = res[0].data.personalSections[0].items;
  } catch (x) {
    // nothing
  }

  try {
    const { value, signature } = resStream.streamPlaybackAccessToken;
    props.stream = `https://usher.ttvnw.net/api/channel/hls/${username}.m3u8?token=${value}&sig=${signature}&supported_codecs=avc1`;
  } catch (x) {
    // nothing
  }

  return { props };
}
