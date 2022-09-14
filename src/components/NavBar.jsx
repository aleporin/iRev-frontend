import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons'
import { FaSearch, FaBookmark, FaRegBookmark, FaCocktail } from 'react-icons/fa'
import { GiSandwich } from 'react-icons/gi'
import { IoIosCreate } from 'react-icons/io'
import { BiLogOut, BiLogIn } from 'react-icons/bi'
import { SiCodechef } from 'react-icons/si'
import { Link } from 'react-router-dom'

import './NavBar.css'

export default function Navbar({ user, logOut, authenticated }) {
  const [sidebar, setSidebar] = useState(false)

  const showSidebar = () => setSidebar(!sidebar)

  let none

  const SidebarData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text',
      onClick: false
    },
    {
      title: 'Bookmarks',
      path: `/savedrecipes/${user.id}`,
      icon: <FaBookmark />,
      cName: 'nav-text',
      onClick: false
    },
    {
      title: 'My Recipes',
      path: `/recipe/${user.id}`,
      icon: <SiCodechef />,
      cName: 'nav-text',
      onClick: false
    },
    {
      title: 'Create Recipe',
      path: `/create/${user.id}`,
      icon: <IoIosCreate />,
      cName: 'nav-text',
      onClick: false
    },
    {
      title: 'Logout',
      path: '/',
      onClick: true,
      icon: <BiLogOut />,

      cName: 'nav-text'
    }
  ]
  const notAuthData = [
    {
      title: 'Home',
      path: '/',
      icon: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },

    {
      title: 'Login',
      path: '/login',
      icon: <BiLogIn />,
      cName: 'nav-text'
    }
  ]

  let isAuthenticated
  if (user) {
    isAuthenticated = (
      <>
        <IconContext.Provider value={{ color: '#FFF' }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <img
                src="https://i.imgur.com/aJRBbj4.png"
                onClick={showSidebar}
                id="nav-logo"
              />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <GiSandwich />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} onClick={() => logOut(item.onClick)}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    )
    const notAuthenticated = (
      <>
        <IconContext.Provider value={{ color: '#FFF' }}>
          {/* All the icons now are white */}
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <img
                src="https://i.imgur.com/aJRBbj4.png"
                onClick={showSidebar}
                id="nav-logo"
              />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <FaCocktail />
                </Link>
              </li>
              {notAuthData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    )

    return (
      <>
        <div>{authenticated && user ? isAuthenticated : notAuthenticated}</div>
      </>
    )
  }
}
