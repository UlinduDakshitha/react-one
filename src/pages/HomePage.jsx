import React from 'react'
import backgroundImage from '../assets/download (1).jpg'
import AppButton from '../components/button'

function HomePage() {
  return (
    <div
      style={{
        backgroundImage: `url("${backgroundImage}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: 16 }}>
        <h1>WELCOME TO STUDENT MANAGEMENT SYSTEM</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <AppButton label="Login" onClick={() => console.log('Login clicked')} />
          <AppButton label="Register" variant="outlined" onClick={() => console.log('Register clicked')} />
        </div>
      </div>
      
    </div>
  )
}

export default HomePage
