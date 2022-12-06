import { useEffect, useState } from 'react'
import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation } from 'react-router-dom'

import { createContact, getContacts } from '../contact'

export async function action () {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader ({ request }: any) {

  const url = new URL(request.url)

  const q = url.searchParams.get('q')

  // @ts-ignore
  const contacts = await getContacts(q)
  return {
    contacts,
    q
  }
}

export default function Root () {

  const {
    contacts,
    q
  } = useLoaderData() as any

  const [query, setQuery] = useState(q || '')

  const navigation = useNavigation()

  // This is the easy way to do it
  /* useEffect(() => {

    const getQ = document.getElementById('q') as HTMLInputElement

    getQ.value = q

  }, [q]) */

  useEffect(() => {

    setQuery(q || '')

  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              // defaultValue={q}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {
                contacts.map((contact: any) => (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({
                        isActive,
                        isPending
                      }) =>
                        isActive ? 'active' : isPending ? 'pending' : ''
                      }
                    >
                      {
                        contact.first || contact.last ? (
                          <>
                            {contact.first} {contact.last}
                          </>
                        ) : (
                          <i>No Name</i>
                        )
                      }{' '}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>

      </div>

      <div
        id="detail"
        className={
          navigation.state === 'loading' ? 'loading' : ''
        }
      >
        <Outlet/>
      </div>
    </>
  )
}
