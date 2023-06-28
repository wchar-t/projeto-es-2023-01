import styles from '@/styles/components/Page.module.css';
import SideBarStreamer from './SideBarStreamer';

declare const window: any; // rm after demo

export default function SideBar() {
  const { recommended }: { recommended: any[] } = window; // rm after demo

  return (
    <div className={styles.sidebar}>
      <div className={styles['sidebar-content']}>
        <div className={styles.separator}>Recomendados</div>
        <SideBarStreamer username="SicK_cs" name="SicK_cs" tag="Valorant" viewers={130} image="https://static-cdn.jtvnw.net/jtv_user_pictures/5c4cd414-101a-422c-ad1b-11d2d9b31246-profile_image-70x70.png" />
        {
          // rm after demo
          recommended.filter((stream:any) => stream.content).map((stream: any) => (
            <SideBarStreamer
              key={stream.content.id}
              username={stream.user.login}
              name={stream.user.displayName}
              tag={stream.content?.game?.displayName || 'Só na conversa'}
              viewers={stream.content?.viewersCount || 0}
              image={stream.user.profileImageURL}
            />
          ))
        }
      </div>
    </div>
  );
}
