import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import Icon from '@/components/Icon';
import styles from '@/styles/components/Page.module.css';
import LoginRegisterModal from '@/components/LoginRegisterModal';

export default function TopBar() {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenReg, onOpen: onOpenReg, onClose: onCloseReg } = useDisclosure();
  // todo1: with lib's local session, get name and set the dropdown text
  // todo2: fix register button. it's not setting the mode to register
  const isLoggedIn = 0;

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" />
            </div>
            PatriotasTV
          </div>
          <div className={styles['menu-content']}>
            <div className={styles['search-wrapper']}>
              <input type="text" placeholder="Buscar" />
              <button type="button"><Icon name="magnifying-glass" /></button>
            </div>
          </div>
          <div className={styles.options}>
            {
              isLoggedIn ? (
                <Menu>
                  <MenuButton as={Button} rightIcon={<Icon name="caret-down" />}>
                    Usuário
                  </MenuButton>
                  <MenuList>
                    <MenuItem icon={<Icon name="user" />}><Link href="/profile">Perfil</Link></MenuItem>
                    <MenuDivider />
                    <MenuItem icon={<Icon name="cog" />}><Link href="/settings">Configurações</Link></MenuItem>
                    <MenuItem icon={<Icon name="arrow-right-from-bracket" />}><Link href="/logout">Logout</Link></MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button type="button" colorScheme="green" size="sm" onClick={() => onOpenLogin()}>Login</Button>
                  <Button type="button" colorScheme="grey" size="sm" onClick={() => onOpenReg()}>Registro</Button>
                </>
              )
            }
          </div>
        </div>
      </nav>
      <LoginRegisterModal isOpen={isOpenLogin} onClose={onCloseLogin} mode="login" />
      <LoginRegisterModal isOpen={isOpenReg} onClose={onCloseReg} mode="register" />
    </>
  );
}
