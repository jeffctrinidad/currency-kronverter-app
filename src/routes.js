import LoginWrapper from './pages/Login/LoginWrapper'
import HomeWrapper from './pages/Home/HomeWrapper'

const routes = [
  {
    path: '/home',
    component: HomeWrapper,
    exact: true,
  },
  {
    path: '/',
    component: LoginWrapper,
    exact: true,
  },
]

export default routes
