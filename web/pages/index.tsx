import Link from 'next/link';
import Page from '@/components/Page';
import LiveStreamItem from '@/components/LiveStreamItem';
import styles from '@/styles/Home.module.css';
import Twitch from '@/lib/twitch';

declare const window: any; // rm after demo

export default function Home({
  streams, // rm after demo
}: {
  streams: object[], // rm after demo
}) {
  window.recommended = streams; // rm after demo

  return (
    <Page>
      <div className={styles.section}>
        <div className={styles['section-title']}>
          Canais de
          <Link href="/"> VALORANT </Link>
          recomandados
        </div>
        <div className={styles['section-content']}>
          <LiveStreamItem
            title="T1 vs. EDG — VALORANT Masters Tokyo — Groups"
            username="valorant"
            name="VALORANT"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/375c4db6-af2a-489e-842a-5e5b3ce287a2-profile_image-50x50.png"
            viewers={22500}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg"
            tags={['VALORANT']}
          />
          <LiveStreamItem
            title="T1 vs. EDG — VALORANT Masters Tokyo — Groups"
            username="valorant"
            name="VALORANT"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/375c4db6-af2a-489e-842a-5e5b3ce287a2-profile_image-50x50.png"
            viewers={22500}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg"
            tags={['VALORANT']}
          />
          <LiveStreamItem
            title="T1 vs. EDG — VALORANT Masters Tokyo — Groups"
            username="valorant"
            name="VALORANT"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/375c4db6-af2a-489e-842a-5e5b3ce287a2-profile_image-50x50.png"
            viewers={22500}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg"
            tags={['VALORANT']}
          />
          <LiveStreamItem
            title="T1 vs. EDG — VALORANT Masters Tokyo — Groups"
            username="valorant"
            name="VALORANT"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/375c4db6-af2a-489e-842a-5e5b3ce287a2-profile_image-50x50.png"
            viewers={22500}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_valorant-440x248.jpg"
            tags={['VALORANT']}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles['section-title']}>
          Canais de
          <Link href="/"> Rocket League </Link>
          que você vai gostar
        </div>
        <div className={styles['section-content']}>
          <LiveStreamItem
            title="#1 in my neighborhood"
            username="jol13n"
            name="jol13n"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/0a779617-334b-4164-b66e-323d6a74d3a6-profile_image-50x50.png"
            viewers={23}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_jol13n-440x248.jpg"
            tags={['Rocket League', 'English']}
          />
          <LiveStreamItem
            title="#1 in my neighborhood"
            username="jol13n"
            name="jol13n"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/0a779617-334b-4164-b66e-323d6a74d3a6-profile_image-50x50.png"
            viewers={23}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_jol13n-440x248.jpg"
            tags={['Rocket League', 'English']}
          />
          <LiveStreamItem
            title="#1 in my neighborhood"
            username="jol13n"
            name="jol13n"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/0a779617-334b-4164-b66e-323d6a74d3a6-profile_image-50x50.png"
            viewers={23}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_jol13n-440x248.jpg"
            tags={['Rocket League', 'English']}
          />
          <LiveStreamItem
            title="#1 in my neighborhood"
            username="jol13n"
            name="jol13n"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/0a779617-334b-4164-b66e-323d6a74d3a6-profile_image-50x50.png"
            viewers={23}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_jol13n-440x248.jpg"
            tags={['Rocket League', 'English']}
          />
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles['section-title']}>
          Em destaque
        </div>
        <div className={styles['section-content']}>
          <LiveStreamItem
            title="EDward Gaming 0x0 T1 | VALORANT Masters Tokyo - Fase de Grupos (Dia 4) #VCTWatchPartyBR"
            username="coreano"
            name="Coreano"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/fb16ce63-59c5-4a8f-8ec7-c1f017fe56b3-profile_image-50x50.png"
            viewers={8105}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_coreano-440x248.jpg"
            tags={['DropsAtivados', 'English']}
          />
          <LiveStreamItem
            title="EDward Gaming 0x0 T1 | VALORANT Masters Tokyo - Fase de Grupos (Dia 4) #VCTWatchPartyBR"
            username="coreano"
            name="Coreano"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/fb16ce63-59c5-4a8f-8ec7-c1f017fe56b3-profile_image-50x50.png"
            viewers={8105}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_coreano-440x248.jpg"
            tags={['DropsAtivados', 'English']}
          />
          <LiveStreamItem
            title="EDward Gaming 0x0 T1 | VALORANT Masters Tokyo - Fase de Grupos (Dia 4) #VCTWatchPartyBR"
            username="coreano"
            name="Coreano"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/fb16ce63-59c5-4a8f-8ec7-c1f017fe56b3-profile_image-50x50.png"
            viewers={8105}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_coreano-440x248.jpg"
            tags={['DropsAtivados', 'English']}
          />
          <LiveStreamItem
            title="EDward Gaming 0x0 T1 | VALORANT Masters Tokyo - Fase de Grupos (Dia 4) #VCTWatchPartyBR"
            username="coreano"
            name="Coreano"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/fb16ce63-59c5-4a8f-8ec7-c1f017fe56b3-profile_image-50x50.png"
            viewers={8105}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_coreano-440x248.jpg"
            tags={['DropsAtivados', 'English']}
          />
        </div>
      </div>
    </Page>
  );
}

// rm after demo
export async function getServerSideProps() {
  const res = await Twitch.fetch({ operations: ['PersonalSections'] });
  const props = { streams: [] };

  try {
    props.streams = res[0].data.personalSections[0].items;
  } catch (x) {
    // nothing
  }

  return { props };
}
