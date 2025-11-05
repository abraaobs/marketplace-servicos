import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('cliente')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role })
      console.log(res.data)
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Erro ao cadastrar')
    }
  }

  return (
    <div className="card">
      <h3>Cadastro</h3>
      <form onSubmit={handleSubmit}>
        <div><label>Nome</label><br/><input value={name} onChange={e => setName(e.target.value)} required /></div>
        <div><label>Email</label><br/><input value={email} onChange={e => setEmail(e.target.value)} required /></div>
        <div><label>Senha</label><br/><input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>
        <div><label>Sou</label><br/>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="prestador">Prestador</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}
