import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/auth/login/login';
import { Registration } from './pages/auth/registration/registration';
import { ConfirmEmail } from './pages/auth/confirmEmail/confirmEmail';
import { ForgotPassword } from './pages/auth/forgotPassword/forgotPassword';
import { ResetPassword } from './pages/auth/resetPassword/resetPassword';
import { Agreement } from './pages/docs/agreement';
import { PrivacyAndPolicies } from './pages/docs/privacy-and-policies copy';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAuth } from './hooks/useAuth';
import type { JSX } from 'react/jsx-runtime';
import { SideBar } from './components/main/sidebar';
import { Home } from './components/main/home';
import { Settings } from './components/main/settings';

export const routes = [
  { path: '/', element: <Login />, private: false },
  { path: '/login', element: <Login />, private: false },
  { path: '/registration', element: <Registration />, private: false  },
  { path: '/confirm', element: <ConfirmEmail />, private: false  },
  { path: '/forgot', element: <ForgotPassword />, private: false  },
  { path: '/reset', element: <ResetPassword />, private: false  },
  { path: '/main', element: <SideBar />, private: false }, // изменить на true
  { path: '/home', element: <Home />, private: false }, // изменить на true
  { path: '/settings', element: <Settings />, private: false }, // изменить на true
  { path: '/agreement', element: <Agreement />, private: false },
  { path: '/policies', element: <PrivacyAndPolicies />, private: false },
]

// изменить на /login
function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAuth()
  return isAuth ? children : <Navigate to="/main" replace />
}

function PublicRoute({ children }: { children: JSX.Element }) {
  const isAuth = useAuth()
  return isAuth ? <Navigate to="/main" replace /> : children

}

const queryClient = new QueryClient()

// <Route path="*" element={<Navigate to="/login" replace />} />
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {routes.map(({ path, element, private: isPrivate }) => (
            <Route>
              <Route key={path} path={path} element={isPrivate ? <PrivateRoute>{element}</PrivateRoute> : <PublicRoute>{element}</PublicRoute>} />
            </Route>
          ))}
          <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}


export default App
