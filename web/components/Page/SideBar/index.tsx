import styles from '@/styles/components/Page.module.css';
import SideBarStreamer from './SideBarStreamer';

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.separator}>Recomendados</div>
        <SideBarStreamer name="SicK_cs" tag="Valorant" viewers={130} image="https://static-cdn.jtvnw.net/jtv_user_pictures/5c4cd414-101a-422c-ad1b-11d2d9b31246-profile_image-70x70.png" />
      </div>
    </div>
  );
}
