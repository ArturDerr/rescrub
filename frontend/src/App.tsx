import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/login/login';
import { Registration } from './pages/auth/registration/registration';
import { ConfirmEmail } from './pages/auth/confirmEmail/confirmEmail';
import { ForgotPassword } from './pages/auth/forgotPassword/forgotPassword';
import { ResetPassword } from './pages/auth/resetPassword/resetPassword';
import { Agreement } from './pages/docs/agreement';
import { PrivacyAndPolicies } from './pages/docs/privacy-and-policies copy';
import { MainPage } from './pages/main/main-page';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const routes = [
  { path: '/', element: <Login /> },
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Registration /> },
  { path: '/confirm', element: <ConfirmEmail /> },
  { path: '/forgot', element: <ForgotPassword /> },
  { path: '/reset', element: <ResetPassword /> },
  { path: '/main', element: <MainPage /> },
  { path: '/agreement', element: <Agreement /> },
  { path: '/policies', element: <PrivacyAndPolicies /> },


]

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}


export default App
