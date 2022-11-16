import { FC, useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { AuthContext, AuthContextProps } from '../../auth'

const Navbar: FC = () => {

  const {
    authState,
    onLogout: onLogoutContext
  } = useContext(AuthContext) as AuthContextProps

  const navigate = useNavigate()
  const {
    pathname,
    search
  } = useLocation()

  const onLogout = () => {

    onLogoutContext()

    navigate('/login', {
      replace: true,
      state: {
        from: pathname + search
      }
    })

  }

  return (

    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

      <Link
        className="navbar-brand"
        to="/"
      >
        Asociaciones
      </Link>

      <div className="navbar-collapse">

        <div className="navbar-nav">

          <NavLink
            className={
              ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink
            className={
              ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to="/dc"
          >
            DC
          </NavLink>

          <NavLink
            className={
              ({ isActive }) => `nav-item nav-link ${isActive ? 'active' : ''}`
            }
            to="/search"
          >
            Search
          </NavLink>

        </div>

      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">

        <ul className="navbar-nav ml-auto">

          <span className="nav-item nav-link text-info">
            {authState.user}
          </span>

          <button
            className="nav-item nav-link btn"
            onClick={onLogout}
          >
            Logout
          </button>

        </ul>

      </div>

    </nav>

  )
}

export default Navbar
