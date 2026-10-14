import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CostPage from './CostPage.tsx'
import ImagesPage from './ImagesPage.tsx'
import PlansPage from './PlansPage.tsx'

const route = window.location.pathname.replace(/\/+$/, '')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {route === '/plans' ? <PlansPage /> : route === '/cost' ? <CostPage /> : route === '/images' ? <ImagesPage /> : <App />}
  </StrictMode>,
)
