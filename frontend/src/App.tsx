import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/login/login';
import { Registration } from './pages/auth/registration/registration';
import { ConfirmEmail } from './pages/auth/confirmEmail/confirmEmail';
import { ForgotPassword } from './pages/auth/forgotPassword/forgotPassword';
import { ResetPassword } from './pages/auth/resetPassword/resetPassword';

export const routes = [
  { path: '/', element: <Login /> },
  { path: '/log', element: <Login /> },
  { path: '/reg', element: <Registration /> },
  { path: '/confirm', element: <ConfirmEmail /> },
  { path: '/forgot', element: <ForgotPassword /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/main', element: <ResetPassword /> },

]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} /> 
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}


export default App
