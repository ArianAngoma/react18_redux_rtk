import { FC } from 'react'
import { Link } from 'react-router-dom'

const Public: FC = () => {

  const content = (
    <section className="public">

      <header>
        <h1>Welcome to Repair Store!</h1>
      </header>

      <main>

        <p>
          Located in Beautiful Downtown Burbank, CA, Repair Store is the place to go for all your repair needs.
        </p>
        <p>&nbsp;</p>

        <address>
          Repair Store <br/>
          1234 Main Street <br/>
          Burbank, CA 91505 <br/>
          <a href="tel:+9999999999">(999) 999-9999</a>
        </address>

      </main>

      <footer>
        <Link to={'/login'}>Employee Login</Link>
      </footer>

    </section>
  )

  return content

}

export default Public
