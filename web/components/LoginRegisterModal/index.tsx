import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import styles from '@/styles/components/LoginRegisterModal.module.css'

interface LoginRegisterModalOptions {
  mode?: 'login' | 'register',
  isOpen: boolean,
  onClose: () => void,
}

export default function LoginRegisterModal({ mode = 'login', isOpen, onClose }: LoginRegisterModalOptions) {
  const [modeState, setModeState] = useState<string>(mode);

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
          <label>
            Usuário
            <input className={styles.input} />
          </label>

          <label>
            Senha
            <input type="pass" className={styles.input} />
          </label>

          <div className={styles.controls}>
            <button type="button" className={styles.enter}>{ modeState === 'login' ? 'Entrar' : 'Registrar-se' }</button>
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
