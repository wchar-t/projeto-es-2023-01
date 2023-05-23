import Link from 'next/link';
import styles from '@/styles/components/Page.module.css';

interface SideBarStreamerOptions {
  name: string,
  image: string,
  viewers: number,
  tag: string,
}

export default function SideBarStreamer({
  name, image, viewers, tag,
}: SideBarStreamerOptions) {
  return (
    <Link href={`/${name}`} className={styles.stream}>
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
            {viewers}
          </div>
        </div>
      </div>
    </Link>
  );
}
