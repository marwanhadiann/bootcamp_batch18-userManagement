import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserCard from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Counter from './Counter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<App />} />
          <Route path='/counter' element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
