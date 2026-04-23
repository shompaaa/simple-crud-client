
import './App.css'
import Users from './components/Users/Users'

const usersPromise = fetch('http://localhost:3000/users').then(res =>res.json())

function App() {

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Simple CRUD</h1>
      <Users usersPromise={usersPromise}></Users>
    </div>
  )
}

export default App
