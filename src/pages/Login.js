import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/Auth'
import { NavLink, Link } from 'react-router-dom'

const Login = ({ setUser, setAuthenticated }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const handleChange = (error) => {
    setFormValues({ ...formValues, [error.target.name]: error.target.value })
  }
  const handleSubmit = async (error) => {
    error.preventDefault()
    const payload = await LoginUser(formValues)
    setFormValues({ username: '', password: '' })
    setUser(payload)
    setAuthenticated(true)
    navigate('/')
  }
  return (
    <div className="pagewrap">
      <div className="container">
        <div className="home-div">
          <h1 className="home-title">Welcome Back</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-wrap">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              onChange={handleChange}
              name="username"
              type="username"
              placeholder="Username"
              value={formValues.username}
              className="input"
              required
            />
          </div>
          <div className="form-wrap">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password}
              required
              className="input"
            />
          </div>
          <div className="login-button" onClick={handleSubmit}>
            <p
              className="login-button-text"
              // disabled={!formValues.username || !formValues.password}
            >
              Login
            </p>
          </div>
        </form>
        <div className="register-line">
          <p className="register-string">Don't have an account?</p>
          <Link to="/register" className="register-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Login
