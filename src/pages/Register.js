import { useState } from 'react'
import { SignUpUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Register = () => {
  let navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (error) => {
    error.preventDefault()
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    await SignUpUser(formData)
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
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                placeholder="username"
                value={username}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="email">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="myemail@email.com"
                value={email}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                value={password}
                required
              />
            </div>
            <div className="form-wrap">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
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
