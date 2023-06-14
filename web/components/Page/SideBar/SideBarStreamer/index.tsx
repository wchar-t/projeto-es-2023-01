import Link from 'next/link';
import styles from '@/styles/components/Page.module.css';
import { simplifyNumber } from '@/lib/utils';

interface SideBarStreamerOptions {
  name: string,
  username: string,
  image: string,
  viewers: number,
  tag: string,
}

export default function SideBarStreamer({
  name, username, image, viewers, tag,
}: SideBarStreamerOptions) {
  return (
    <Link href={`/c/${username}`} className={styles.stream}>
      <div className={styles.image}>
        <img src={image} />
      </div>
      <div className={styles.info}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.tag}>
          {tag}
        </div>
      </div>
      <div className={styles.viewers}>
        <div>
          <div className={styles.icon}> </div>
          <div className={styles.count}>
            {simplifyNumber(viewers)}
          </div>
        </div>
      </div>
    </Link>
  );
}
