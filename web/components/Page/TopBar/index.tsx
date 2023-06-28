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
import Api from '@/lib/api';

export default function TopBar() {
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenReg, onOpen: onOpenReg, onClose: onCloseReg } = useDisclosure();

  const { session } = Api;

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.menu}>
          <Link href="/" className={styles.brand}>
            <div className={styles.logo}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg" />
            </div>
            PatriotasTV
          </Link>
          <div className={styles['menu-content']}>
            <div className={styles['search-wrapper']}>
              <input type="text" placeholder="Buscar" />
              <button type="button"><Icon name="magnifying-glass" /></button>
            </div>
          </div>
          <div className={styles.options}>
            {
              session ? (
                <Menu>
                  <MenuButton>
                    <img src={session.picture} className={styles.avatar} />
                  </MenuButton>
                  <MenuList>
                    <div className={styles['dropdown-display-username']}>
                      <img src={session.picture} className={styles.avatar} />
                      <span>
                        { session.username }
                      </span>
                    </div>
                    <MenuDivider />
                    <Link href={`/c/${session.username}`}><MenuItem icon={<Icon name="user" />}>Perfil</MenuItem></Link>
                    <MenuDivider />
                    <Link href="/settings"><MenuItem icon={<Icon name="cog" />}>Configurações</MenuItem></Link>
                    <MenuItem icon={<Icon name="arrow-right-from-bracket" />} onClick={() => Api.logout()}>Logout</MenuItem>
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
