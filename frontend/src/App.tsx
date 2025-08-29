import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/login/login';
import { Registration } from './pages/auth/registration/registration';
import { ConfirmEmail } from './pages/auth/confirmEmail/confirmEmail';
import { ForgotPassword } from './pages/auth/forgotPassword/forgotPassword';
import { ResetPassword } from './pages/auth/resetPassword/resetPassword';
import { Agreement } from './pages/docs/agreement';
import { PrivacyAndPolicies } from './pages/docs/privacy-and-policies copy';

export const routes = [
  { path: '/', element: <Login /> },
  { path: '/log', element: <Login /> },
  { path: '/reg', element: <Registration /> },
  { path: '/confirm', element: <ConfirmEmail /> },
  { path: '/forgot', element: <ForgotPassword /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/main', element: <ResetPassword /> },
  { path: '/agreement', element: <Agreement /> },
  { path: '/policies', element: <PrivacyAndPolicies /> },


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
