import { useEffect, useRef } from 'react';
import styles from '@/styles/components/AcceptCookies.module.css';
import Icon from '../Icon';

export default function AcceptCookies() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookies = localStorage.getItem('cookies');

    if (!cookies && wrapperRef.current) {
      wrapperRef.current.style.display = 'flex';
    }
  }, []);

  function savePreference() {
    if (wrapperRef.current) {
      wrapperRef.current.style.display = 'none';
    }

    localStorage.setItem('cookies', 'true');
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.icon}>
        <Icon name="cookie-bite" type="light" />
      </div>
      <div className={styles.info}>
        <h3>Este site usa cookies</h3>
        <p>
          Usamos cookies para personalizar conteúdo e anúncios, fornecer
          recursos de mídia social e analisar nosso tráfego. Também compartilhamos
          informações sobre o uso do nosso site com nossos parceiros de mídia social,
          publicidade e análise.
        </p>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => savePreference()}>Aceitar</button>
        <button type="button" className={styles.decline} onClick={() => savePreference()}>Recusar</button>
      </div>
    </div>
  );
}
