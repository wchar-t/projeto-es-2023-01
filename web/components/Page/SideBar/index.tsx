import styles from '@/styles/components/Page.module.css';
import SideBarStreamer from './SideBarStreamer';

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles['sidebar-content']}>
        <div className={styles.separator}>Recomendados</div>
        <SideBarStreamer name="SicK_TV" tag="Valorant" viewers={130} image="https://static-cdn.jtvnw.net/jtv_user_pictures/5c4cd414-101a-422c-ad1b-11d2d9b31246-profile_image-70x70.png" />
        <SideBarStreamer name="alanzoka" tag="jogo de terror" viewers={3000} image="https://yt3.googleusercontent.com/ytc/AGIKgqMcLFqcH7aZuBRihSbFmUk3pCkAulLv7SEgJPzq=s176-c-k-c0x00ffffff-no-rj" />
        <SideBarStreamer name="RonaldoTV" tag="Warzone" viewers={130} image="https://yt3.ggpht.com/vhYGgxXhGVUwVI2thDQskSRrMHOzdcAH7fPSEmj_uNkk9S6qFZ8UJz5BNwBLMktNehXBAZJR=s176-c-k-c0x00ffffff-no-rj-mo" />
        <SideBarStreamer name="Aleksis007" tag="Free-fire" viewers={130} image="https://yt3.googleusercontent.com/vE1vjc1kD1TmO_y3LckbYoNVuDoFJm80Gcm2oiaXigLo13yYIpD9TCZlsB3CjUnFhu3KLUMK=s176-c-k-c0x00ffffff-no-rj" />
      </div>
    </div>
  );
}
