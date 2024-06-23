import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterConfig } from './RouterConfig'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider> 
      <RouterConfig />
    </ThemeProvider>
  </React.StrictMode>,
)
