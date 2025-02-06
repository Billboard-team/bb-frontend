import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import './index.css'
import App from '@/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dev from '@/pages/dev-page'
import SignupForm from '@/pages/sign-up-page'; 


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App/>}/>
          <Route path='dev' element={<Dev />} />
          <Route path='signup' element={<SignupForm />} />  
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
