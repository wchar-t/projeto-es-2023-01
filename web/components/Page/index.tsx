import { ReactNode } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import styles from '@/styles/components/Page.module.css';
import AcceptCookies from '../AcceptCookies';

export default function Page({ padding = 30, children }: {
  padding?: number,
  children: ReactNode
}) {
  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.main}>
        <SideBar />
        <div className={styles.content} style={{ padding }}>
          {children}
        </div>
      </div>
      <AcceptCookies />
    </div>
  );
}
