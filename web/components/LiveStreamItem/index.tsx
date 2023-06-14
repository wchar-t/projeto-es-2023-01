import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '@/styles/components/LiveStreamItem.module.css';
import StreamTag from '../StreamTag';
import { simplifyNumber } from '@/lib/utils';

interface LiveStreamItemOptions {
  title: string,
  name: string,
  username: string,
  profilePicture: string,
  viewers: number,
  thumbnail: string,
  tags: string[],
}

export default function LiveStreamItem({
  title,
  name,
  username,
  profilePicture,
  viewers,
  thumbnail,
  tags,
}: LiveStreamItemOptions) {
  const [color, setColor] = useState<string>('009736');

  useEffect(() => {
    setColor(Math.floor(Math.random() * 0xffffff).toString(16));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <div className={styles['sc-transform']} style={{ background: `#${color}` }}> </div>
        <div className={styles['sc-transform-tl']} style={{ borderRightColor: `#${color}` }}> </div>
        <div className={styles['sc-transform-br']} style={{ borderTopColor: `#${color}` }}> </div>
        <div className={styles['thumbnail-wrapper']}>
          <img src={thumbnail} alt={title} />
          <div className={styles.live}>AO VIVO</div>
          <div className={styles.viewers}>
            <div>
              {simplifyNumber(viewers)} espectadores
            </div>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles['profile-picture']}>
          <img src={profilePicture} alt={name} />
        </div>
        <div className={styles['stream-info']}>
          <div className={styles['stream-title']}><Link href={`/c/${username}`}>{title}</Link></div>
          <div className={styles['stream-username']}><Link href={`/c/${username}`}>{name}</Link></div>
          <div className={styles['stream-tags']}>
            {tags.map((tag) => (
              <StreamTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
