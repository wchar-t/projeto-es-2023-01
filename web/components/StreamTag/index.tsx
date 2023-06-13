import Link from 'next/link';
import styles from '@/styles/components/StreamTag.module.css';

export default function StreamTag({
  tag,
}: {
  tag: string,
}) {
  return <Link href={`/tags/${tag}`} className={styles.tag}>{tag}</Link>
}
