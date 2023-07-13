import React from 'react';
import { Route, Router, Navigate, Switch, Routes, Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import Welcome from './features/auth/Welcome';
import DashLayout from './components/DashLayout';
import Register from './features/auth/Register';
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';

function App() {
  // const user = useSelector((state) => state.user.currentUser);
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>

          {/* Public Routes */}
          <Route index element={<Public />}/>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        
          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route exact path="dash" element={<DashLayout/>}>
                  <Route index element={<Welcome />}/>
                </Route>
              </Route>
            </Route>
          </Route>  
          {/* End of Protected Routes */}
        </Route>
      </Routes>
  )
}
export default App;

