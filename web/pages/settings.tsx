import { useEffect, useRef, useState } from 'react';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Button,
} from '@chakra-ui/react'
import Page from '@/components/Page';
import { censoredEmail } from '@/lib/utils';
import styles from '@/styles/Settings.module.css';
import Api from '@/lib/api';
import Icon from '@/components/Icon';

export default function Settings() {
  // no need to protect route, as content is not sensitive
  // but boilerplate
  const ppRef = useRef<HTMLInputElement>(null);
  const newEmailRef = useRef<HTMLInputElement>(null);
  const newReEmailRef = useRef<HTMLInputElement>(null);
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);
  const [isEmailEditing, setIsEmailEditing] = useState<boolean>(false);

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

  async function onEmailSave() {
    const newEmail = newEmailRef.current?.value;

    if (!newEmail) return;

    await Api.updateEmail(newEmail);
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
              <div className={styles.section}>
                <h2>Contato</h2>
                <div className={`${styles.box} ${styles['change-contact']}`}>
                  <div className={styles['box-label-container']}>
                    E-mail
                  </div>
                  <div>
                    {
                      !isEmailEditing
                        ? (
                          <div className={styles['display-email']}>
                            <span>
                              {
                              !isEmailVisible ? censoredEmail(Api.session.email) : Api.session.email
                              }
                            </span>
                            <div className={styles.controls}>
                              <Button size="sm" colorScheme="none" onClick={() => setIsEmailVisible(!isEmailVisible)}>
                                <Icon name={isEmailVisible ? 'eye-slash' : 'eye'} />
                              </Button>
                              <Button size="sm" colorScheme="none" onClick={() => setIsEmailEditing(!isEmailEditing)}>
                                <Icon name="pencil" />
                              </Button>
                            </div>
                          </div>
                        )
                        : (
                          <div className={styles['edit-email']}>
                            <input type="text" defaultValue={Api.session.email} ref={newEmailRef} />
                            <span>Confirmar e-email</span>
                            <input type="text" defaultValue={Api.session.email} ref={newReEmailRef} />
                            <div>
                              <Button size="sm" fontWeight={400} colorScheme="green" onClick={() => onEmailSave()}>Salvar</Button>
                              <Button size="sm" fontWeight={400} colorScheme="none" onClick={() => setIsEmailEditing(!isEmailEditing)}>Cancelar</Button>
                            </div>
                          </div>
                        )
                    }
                    <div className={styles.muted}>Este e-mail será vinculado à sua conta</div>
                  </div>
                </div>
              </div>
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
