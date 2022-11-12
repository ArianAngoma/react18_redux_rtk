import { FC } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const Navbar: FC = () => {

  const navigate = useNavigate()

  const onLogout = () => navigate('/login', { replace: true })

  return (

    <>

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

          </div>

        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">

          <ul className="navbar-nav ml-auto">

          <span className="nav-item nav-link text-info">
            Arian
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

      <div className="container">

        <Outlet/>

      </div>

    </>

  )
}

export default Navbar
