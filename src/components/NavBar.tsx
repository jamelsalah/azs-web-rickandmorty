import { NavLink } from 'react-router-dom'

import styles from './NavBar.module.css'

// O NavLink entrega { isActive }; devolvo a classe conforme a aba atual.
// if/else (não ternário) para seguir o padrão do projeto.
function navLinkClass({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return `${styles.link} ${styles.active}`
  }
  return styles.link
}

export function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <NavLink to="/" end className={navLinkClass}>
          Episódios
        </NavLink>
        <NavLink to="/favoritos" className={navLinkClass}>
          Favoritos
        </NavLink>
      </div>
    </nav>
  )
}
