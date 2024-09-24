import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import './App.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home , History, Notes, Converter, Profile, Login, Signup, Authentication } from './pages'
import Protected from './components/Protected.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        path:'/',
        element:(
          <Protected authentication={false}>
            <Authentication />
          </Protected>
        )
      },
      {
        path:'/home',
        element:(
          <Protected authentication={true}>
            <Home />
          </Protected>
        ),
      },
      {
        path:'/signup',
        element:(
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path:'/history',
        element:(
          <Protected authentication={true}>
            <History />
          </Protected>
        )
      },
      {
        path:'/notes',
        element:(
          <Protected authentication={true}>
            <Notes />
          </Protected>
        )
      },
      {
        path:'/converter',
        element:(
          <Protected authentication={true}>
            <Converter />
          </Protected>
        )
      },
      {
        path:'/profile',
        element:(
          <Protected authentication={true}>
            <Profile />
          </Protected>
        )
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
)
