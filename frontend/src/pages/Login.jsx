import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // placeholder: no real auth implemented yet
      const res = await axios.post('/api/auth/register', { name: 'temp', email, password, role: 'cliente' })
      console.log(res.data)
      navigate('/')
    } catch (err) {
      console.error(err)
      alert('Erro ao autenticar (mock)')
    }
  }

  return (
    <div className="card">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div><label>Email</label><br/><input value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div><label>Senha</label><br/><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <button type="submit">Entrar (mock)</button>
      </form>
    </div>
  )
}
