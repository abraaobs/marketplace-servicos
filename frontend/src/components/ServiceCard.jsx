import React from 'react'

export default function ServiceCard({ service }) {
  return (
    <div className="card">
      <h4>{service.title}</h4>
      <p>{service.description}</p>
      <div><strong>R$ {Number(service.price).toFixed(2)}</strong></div>
      <div>Prestador: {service.provider ? service.provider.name : '—'}</div>
      <div style={{marginTop:8}}>
        <button onClick={() => alert('Funcionalidade contratar mockada')}>Contratar</button>
      </div>
    </div>
  )
}
