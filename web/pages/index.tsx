import Link from 'next/link';
import Page from '@/components/Page';
import LiveStreamItem from '@/components/LiveStreamItem';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <Page>
      <div className={styles.section}>
        <div className={styles['section-title']}>
          Canais de
          <Link href="/about"> Rocket League </Link>
          que achamos que vai gostar
        </div>
        <div className={styles['section-content']}>
          <LiveStreamItem
            title="Tentando Grind Até o GC Dia 2l!!!| !sorteio !Loja !comandos !pix"
            username="Rhaposo"
            profilePicture="https://static-cdn.jtvnw.net/jtv_user_pictures/9f3023fd-08b4-49b1-9e04-6e5b665ca488-profile_image-300x300.png"
            viewers={160}
            thumbnail="https://static-cdn.jtvnw.net/previews-ttv/live_user_rhaposo-440x248.jpg"
            tags={['Rocket League', 'Português']}
          />
        </div>
      </div>
      <div>aaa</div>
    </Page>
  );
}
