import { useState } from 'react'
import { SignUpUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Register = () => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
    const payload = await SignUpUser(formValues)
    setFormValues({ username: '', email: '', password: '' })
    navigate('/login')
  }
  return (
    <div>
      <div className="pagewrap">
        <div class="container">
          <h1>Register</h1>
          <form className="col" onSubmit={handleSubmit}>
            <div className="form-wrap">
              <label htmlFor="username">Username</label>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="username"
                value={formValues.username}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="myemail@email.com"
                value={formValues.email}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                value={formValues.password}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <div className="login-button" onClick={handleSubmit}>
              <p className="login-button-text">Sign Up</p>
            </div>
            <div className="nevermind-btn">
              <div className="login-button" onClick={handleSubmit}>
                <Link to="/">
                  <p className="login-button-text">Maybe Next Time!</p>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register
