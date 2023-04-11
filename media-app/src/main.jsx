import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './assets/index.css'
import './assets/css/material-kit.min.css'
import './assets/js/material-kit.min.js'
import './assets/fontawesome-6.4.0/css/fontawesome.css'
import './assets/fontawesome-6.4.0/css/solid.css'
import './assets/js/core/bootstrap.min.js'
import {router} from './config/routes/routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)