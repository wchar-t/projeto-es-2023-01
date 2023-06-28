import Page from '@/components/Page';
import styles from '@/styles/Home.module.css';
import Notificate from '@/components/Notificate'


export default function Home() {
  return (
    <Page>
      <div className={styles.section}>
        <div className={styles['section-title']}>
          Notificações
        </div>
      </div>
      <div>Qual usuário tu desejas receber notificação?</div>
      <Notificate />
    </Page>
  );
}
