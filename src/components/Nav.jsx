import React from 'react'
import Search from './Search'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const Nav = ({ authenticated, user }) => {
  const [nav, setNav] = useState(false)

  const styles = {
    className:
      'text-gray-600 block px-2 py-1 hover:underline hover:text-gray-900',
    activeclassname: 'underline text-gray-900'
  }

  const authLinks = [
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/',
      name: 'Home'
    },
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/profile',
      name: 'Profile'
    },
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/createrecipe',
      name: 'Create Recipe'
    },
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/',
      name: 'Logout'
    }
  ]

  const notAuthLinks = [
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/',
      name: 'Home'
    },
    {
      className: styles.className,
      activeclassname: styles.activeclassname,
      to: '/login',
      name: 'Login'
    }
  ]

  let isAuthenticated
  if (user) {
    isAuthenticated = (
      <div className="nav-wrap">
        <Search />
        <div onClick={() => setNav(!nav)} className="menu-wrap">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <div>
            <ul className="nav-link-wrap">
              {authLinks.map((link) => (
                <Link
                  className={link.className}
                  activeclassname={link.activeclassname}
                  to={link.to}
                  key={authLinks.name}
                >
                  {link.name}
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  const notAuthenticated = (
    <div className="nav-wrap">
      <Search />
      <div onClick={() => setNav(!nav)} className="menu-wrap">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <div>
          <ul className="nav-link-wrap">
            {notAuthLinks.map((link) => (
              <Link
                className={link.className}
                activeclassname={link.activeclassname}
                to={link.to}
                key={notAuthLinks.name}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return <div>{authenticated && user ? isAuthenticated : notAuthenticated}</div>
}

export default Nav
