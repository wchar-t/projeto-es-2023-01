import {
  Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,
} from '@chakra-ui/react'
import Page from '@/components/Page';
import styles from '@/styles/Settings.module.css';

export default function Settings() {
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
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  );
}
