import { ReactNode } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import styles from '@/styles/components/Page.module.css';

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <TopBar />
      <div className={styles.main}>
        <SideBar />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
