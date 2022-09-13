import React from 'react'
import Search from './Search'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = ({ logOut, authenticated, user }) => {
  let isAuthenticated
  if (user) {
    isAuthenticated = (
      <div class="w-60 h-full shadow-md bg-white px-1 absolute">
        <ul class="relative">
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              href="/"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Home
            </a>
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              href={`/savedrecipes/${user.id}`}
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Saved Recipes
            </a>
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              href={`/recipe/${user.id}`}
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              My Recipes
            </a>
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              href={`/create/${user.id}`}
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Create Recipe
            </a>
          </li>
          <li class="relative">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              href="/"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              onClick={logOut}
            >
              Log Out
            </a>
          </li>
        </ul>
      </div>
    )
  }

  const notAuthenticated = (
    <div class="w-60 h-full shadow-md bg-white px-1 absolute">
      <ul class="relative">
        <li class="relative">
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            href="/"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            Home
          </a>
        </li>
        <li class="relative">
          <a
            class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
            href="/login"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
            onClick={logOut}
          >
            Login
          </a>
        </li>
      </ul>
    </div>
  )

  return (
    <div className="side-bar">
      {authenticated && user ? isAuthenticated : notAuthenticated}
    </div>
  )
}

export default Sidebar
