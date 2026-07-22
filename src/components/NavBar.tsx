import { NavLink } from 'react-router-dom'

export function NavBar() {
  return (
    <nav>
      <NavLink to="/" end>
        Episódios
      </NavLink>
      <NavLink to="/favoritos">
        Favoritos
      </NavLink>
    </nav>
  )
}
