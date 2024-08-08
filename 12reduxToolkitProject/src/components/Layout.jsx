import React from 'react'
import {Outlet} from 'react-router-dom'
import NavPanel from './NavPanel'
import {Provider} from 'react-redux'
import store from '../features/store'

function Layout() {
  return (<>
  <Provider store= {store}>
  <NavPanel />
<Outlet />
</Provider>
</>
  )
}

export default Layout