import Link from 'next/link';
import Page from '@/components/Page';
import LiveStreamItem from '@/components/LiveStreamItem';
import styles from '@/styles/Home.module.css';
import BanUser from '@/components/BanUser'
export default function Home() {
  return (
    <Page>
      <div className={styles.section}>
        <div className={styles['section-title']}>
          Banir Usuário
        </div>
      </div>
      <div>Selecione o usuário que deseja banir:</div>
      <BanUser/>
    </Page>
  );
}
