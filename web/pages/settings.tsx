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
  const newUserRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newRePasswordRef = useRef<HTMLInputElement>(null);
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(false);
  const [isEmailEditing, setIsEmailEditing] = useState<boolean>(false);
  const [isUserEditing, setIsUserEditing] = useState<boolean>(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState<boolean>(false);

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

  async function onUserSave() {
    const newUser = newUserRef.current?.value;

    if (!newUser || !isUserEditing) return;

    const { error } = await Api.updateUsername(newUser);

    if (error) {
      newUserRef.current?.classList.add(styles['input-error']);
    } else {
      window.location.reload();
    }
  }

  async function onPasswordSave() {
    const newPassword = newPasswordRef.current?.value;
    const newRePassword = newRePasswordRef.current?.value;

    if (!newPassword || !newRePassword || !isPasswordEditing) return;

    const { error } = await Api.updatePassword(newPassword, newRePassword);

    if (error) {
      newPasswordRef.current?.classList.add(styles['input-error']);
      newRePasswordRef.current?.classList.add(styles['input-error']);
    } else {
      window.location.reload();
    }
  }

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  function onInputKeyPress(e: KeyboardEvent) {
    (e.currentTarget as HTMLInputElement).classList.remove(styles['input-error']);
  }

  useEffect(() => {
    if (!Api.session) {
      window.location.href = '/';
    }

    const inputs = document.querySelectorAll<HTMLInputElement>(`.${styles.tabs} input`);

    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('keypress', onInputKeyPress)
    });

    return () => {
      inputs.forEach((input: HTMLInputElement) => {
        input.removeEventListener('keypress', onInputKeyPress)
      });
    }
  }, []);

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
                    <Button size="sm" colorScheme="none" className={styles['box-button']} onClick={() => ppRef.current?.click()}>Adicionar uma foto de perfil</Button>
                    <div className={styles.muted}>A imagem pode estar em PNG, GIF, JPG</div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2>Configurações de Perfil</h2>
                <div className={`${styles.box} ${styles['change-user']}`}>
                  <div className={styles['box-label-container']}>
                    Usuário
                  </div>
                  <div className={styles['box-content']}>
                    <div className={styles['input-group']}>
                      <input disabled={!isUserEditing} type="text" defaultValue={Api.session.username} ref={newUserRef} />
                      <button type="button" onClick={() => setIsUserEditing(!isUserEditing)}>
                        <Icon name="pencil" />
                      </button>
                    </div>
                    <div className={styles.muted}>Você pode editar seu usuário</div>
                  </div>
                  <div className={styles['box-footer']}>
                    <Button size="sm" colorScheme="none" className={styles['box-button']} onClick={() => onUserSave()}>Enviar</Button>
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

              <div className={styles.section}>
                <h2>Proteção</h2>
                <div className={`${styles.box} ${styles['change-password']}`}>
                  <div className={styles['box-label-container']}>
                    Senha
                  </div>
                  <div className={styles['box-content']}>
                    <div>
                      <input disabled={!isPasswordEditing} type="text" ref={newPasswordRef} placeholder="Digite a nova senha" />
                      <input disabled={!isPasswordEditing} type="text" ref={newRePasswordRef} placeholder="Digite novamente a nova senha" />
                    </div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    >
                      <div className={styles.muted}>Aumente sua segurança com uma senha forte</div>
                      <Button size="sm" colorScheme="none" className={styles['box-button']} onClick={() => setIsPasswordEditing(!isPasswordEditing)}>
                        { !isPasswordEditing ? 'Editar' : 'Cancelar' }
                      </Button>
                    </div>
                  </div>
                  <div className={styles['box-footer']}>
                    <Button size="sm" colorScheme="none" className={styles['box-button']} onClick={() => onPasswordSave()}>Enviar</Button>
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
