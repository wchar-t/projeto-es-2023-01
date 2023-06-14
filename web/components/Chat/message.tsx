import Link from 'next/link';
import styles from '@/styles/components/Chat.module.css';

export default function Message({
  color,
  username,
  message,
}: {
  color: string,
  username: string,
  message: string,
}) {
  return (
    <div className={styles.message}>
      <Link
        href={`/c/${username}`}
        ref={(node) => {
          if (node) {
            node.style.setProperty('color', color, 'important');
          }
        }}
      >{username}
      </Link>
      :
      <span>{message}</span>
    </div>
  );
}
