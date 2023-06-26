import { useEffect, useRef } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Button,
} from '@chakra-ui/react'
import Page from '@/components/Page';
import styles from '@/styles/Settings.module.css';
import Api from '@/lib/api';

export default function Settings() {
  // no need to protect route, as content is not sensitive
  // but boilerplate
  const ppRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!Api.session) {
      window.location.href = '/';
    }
  }, []);

  if (!Api.session) {
    return <div> </div>;
  }

  async function onPPChange() {
    const file = ppRef.current?.files?.[0];

    if (!file) return;

    await Api.updateProfilePicture(file);
    window.location.reload();
  }

  return (
    <Page>
      <h1 className={styles.settings}>
        Configurações
      </h1>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Perfil</Tab>
          <Tab>Segurança</Tab>
          <Tab>Conexões</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="2px" />
        <div className={styles.tabs}>
          <TabPanels>
            <TabPanel>
              <div className={styles.section}>
                <h2>Imagem de perfil</h2>
                <div className={`${styles.box} ${styles['change-pp']}`}>
                  <img src={Api.session.picture} />
                  <div>
                    <input type="file" ref={ppRef} onChange={onPPChange} style={{ display: 'none' }} />
                    <Button size="sm" colorScheme="facebook" onClick={() => ppRef.current?.click()}>Adicionar uma foto de perfil</Button>
                    <div className={styles.muted}>A imagem pode estar em PNG, GIF, JPG</div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </div>
      </Tabs>
    </Page>
  );
}
