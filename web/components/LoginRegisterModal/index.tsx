import { useRef, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import styles from '@/styles/components/LoginRegisterModal.module.css'
import Api from '@/lib/api';

interface LoginRegisterModalOptions {
  mode?: 'login' | 'register',
  isOpen: boolean,
  onClose: () => void,
}

export default function LoginRegisterModal({ mode = 'login', isOpen, onClose }: LoginRegisterModalOptions) {
  const [modeState, setModeState] = useState<string>(mode);
  const [errorState, setErrorState] = useState<string>('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function onEnterClick() {
    const username = usernameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const { error, jwt } = modeState === 'login'
      ? await Api.login(username, password)
      : await Api.register(username, email, password);

    if (error) {
      setErrorState(error.message);
      return;
    }

    window.localStorage.setItem('token', jwt);
    window.location.reload();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <div className={styles.header}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" />
          { modeState === 'login' ? 'Entre no PatriotasTV' : 'Junte-se ao PatriotasTV' }
        </div>

        <ModalBody className={styles['modal-body']}>

          {
            errorState
              ? (
                <Alert status="error" marginBottom={15}>
                  <AlertIcon />
                  <AlertTitle>Erro</AlertTitle>
                  <AlertDescription>{ errorState }</AlertDescription>
                </Alert>
              ) : null
          }

          <label>
            Usuário
            <input className={styles.input} ref={usernameRef} />
          </label>

          {
            modeState === 'register'
              ? (
                <label>
                  Email
                  <input className={styles.input} ref={emailRef} />
                </label>
              ) : null
          }

          <label>
            Senha
            <input type="pass" className={styles.input} ref={passwordRef} />
          </label>

          <div className={styles.controls}>
            <button type="button" className={styles.enter} onClick={onEnterClick}>{ modeState === 'login' ? 'Entrar' : 'Registrar-se' }</button>
            <button type="button" onClick={() => setModeState(modeState === 'login' ? 'register' : 'login')}>
              {
                modeState === 'login'
                  ? 'Não tem uma conta? Faça o registro'
                  : 'Tem uma conta? Faça o login'
              }
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
