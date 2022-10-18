import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-light rounded-3">
      <div className="container-fluid">

        <Link
          className="navbar-brand"
          to={{
            pathname: '/'
          }}
        >
          useContext
        </Link>


        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">

            <li className="nav-item">
              <NavLink
                className={
                  ({isActive}) => `nav-link ${isActive ? 'active' : ''}`
                }
                to="/"
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={
                  ({isActive}) => `nav-link ${isActive ? 'active' : ''}`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    className={
                        ({isActive}) => `nav-link ${isActive ? 'active' : ''}`
                    }
                    to="/login"
                >
                    Login
                </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )

}

export default Navbar
