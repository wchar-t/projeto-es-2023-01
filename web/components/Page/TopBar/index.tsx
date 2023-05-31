import Icon from '@/components/Icon';
import styles from '@/styles/components/Page.module.css';

export default function TopBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.menu}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" />
          </div>
          PatriotasTV
        </div>
        <div className={styles['menu-content']}>
          <div className={styles['search-wrapper']}>
            <input type="text" placeholder="Buscar" />
            <button type="button"><Icon name="magnifying-glass" /></button>
          </div>
        </div>
        <div className={styles.options}>
          
        </div>
      </div>
    </nav>
  );
}
