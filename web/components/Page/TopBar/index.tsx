import Link from 'next/link';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from '@chakra-ui/react';
import Icon from '@/components/Icon';
import styles from '@/styles/components/Page.module.css';

export default function TopBar() {
  // todo: with lib's local session, get name and set the dropdown text
  const isLoggedIn = 0;

  return (
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
                <Button type="button" colorScheme="green" size="sm">Login</Button>
                <Button type="button" colorScheme="grey" size="sm">Registro</Button>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
}
