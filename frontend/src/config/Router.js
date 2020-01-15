import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import React, { Suspense, lazy, useContext, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import LayoutAuth from '../components/Layout/LayoutAuth'
import { AuthContext } from '../components/Auth/AuthContext'
import { PrivateRoute } from '../components/Global/PrivateRoute'
import { getUser } from '../components/Auth/AuthActions'
import { BrowserView, MobileView } from 'react-device-detect'
import HeaderWeb from '../components/Global/Header/HeaderWeb'
import HeaderMob from '../components/Global/Header/HeaderMob'
import getUserRoutes from './UserRoutes'

export const routes = [
  {
    name: 'Courses',
    path: '/courses',
    component: lazy(() => import('../components/Courses/CoursesRouter'))
  },
  {
    name: 'Rooms',
    path: '/rooms',
    component: lazy(() => import('../components/Rooms/RoomsRouter'))
  },
  {
    name: 'Timetable',
    path: '/Timetable',
    component: lazy(() => import('../components/Timetable/StaffsRouter'))
  },
]

export const extraRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: lazy(() => import('../components/Auth/Login'))
  },
  {
    name: 'Register',
    path: '/register',
    component: lazy(() => import('../components/Auth/RegisterView'))
  }
]


export default function Router() {
  const authContext = useContext(AuthContext)
  const { loggedIn, user } = authContext.state
  useEffect(() => {
    loggedIn && getUser(authContext)
  }, [loggedIn])
  return (
    <BrowserRouter>
      {
        loggedIn ? (
            <>
              <BrowserView>
                <HeaderWeb role={user && user.role}/>
                <RouterContent loggedIn={loggedIn} />
              </BrowserView>
              {/* to do - on mobile a screen that shows a message that this website isnt available on mobile */}
              {/*<MobileView>*/}
              {/*  <HeaderMob/>*/}
              {/*  <RouterContent loggedIn={loggedIn} role={user && user.role}/>*/}
              {/*</MobileView>*/}
            </>)
          :
          (
            <>
              <BrowserView>
                <RouterContent loggedIn={loggedIn} role={user && user.role}/>
              </BrowserView>
              {/* to do - on mobile a screen that shows a message that this website isnt available on mobile */}
              {/*<MobileView>*/}
              {/*  <RouterContent loggedIn={loggedIn} role={user && user.role}/>*/}
              {/*</MobileView>*/}
            </>)
      }

    </BrowserRouter>
  )
}

export function RouterContent({ loggedIn, role }) {
  let selectedRoutesByRole = getUserRoutes(role)
  return (
    <Suspense fallback={<div/>}>
      <Switch>
        {
          selectedRoutesByRole.map((route, index) => (
              <PrivateRoute
                key={index} path={route.path}
                allowed={!!loggedIn}
                redirectTo='/login'
                render={(props) => (
                  <Layout {...props} Content={route.component}/>
                )}
              />
            )
          )
        }
        {
          extraRoutes.map((route, index) => (
            <PrivateRoute
              key={index} path={route.path}
              allowed={!loggedIn}
              redirectTo={'/courses'}
              render={(props) => (
                <LayoutAuth {...props} Content={route.component}/>

              )}
            />
          ))
        }
        <Route path='' render={() => <Redirect to='/login'/>}/>
      </Switch>
    </Suspense>
  )
}
