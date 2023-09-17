import React from 'react';
import './App.css'; 
import { Route, Routes } from 'react-router-dom';
import HomePage from './features/pages/HomePage';
import ChatPage from './features/chat/ChatPage';
import PersistLogin from './features/auth/PersistLogin';
import Prefetch from './features/auth/Prefetch';
import ChatProvider from './context/ChatProvider';
import FindPage from './features/find/FindPage';
import ReportPage from './features/report/ReportPage';
import EditReportForm from './features/report/EditReportForm';
import NewReportForm from './features/report/NewReportForm';
import ItemPage from './features/report/ItemPage';
import ChatLoad from './features/chat/ChatLoad';
import DashLayout from './components/DashLayout';
import ChatVerify from './features/chat/ChatVerify';
import ProfilePage from './features/profile/ProfilePage';
import ProfilePageLoad from './features/profile/ProfilePageLoad';
import ProfileEditLoad from './features/profile/ProfileEditLoad';
import ProfileEditForm from './features/profile/ProfileEditForm';
import Login from './features/auth/Login1';
import AdminLogin from './admin/features/auth/AdminLogin';
import AdminPersistLogin from './admin/features/auth/AdminPersistLogin';
import AdminDash from './admin/features/auth/AdminDash';
import AdminRequireAuth from './admin/features/auth/AdminRequireAuth';
import Layout from './components/Layout';
import Public from './components/Public';
import AdminPublic from './admin/components/AdminPublic';
import AdminDashLayout from './admin/components/AdminDashLayout';
import AdminReportPage from './admin/features/report/AdminReportPage';
import AdminMessagesPage from './admin/features/messages/AdminMessagesPage';
import AdminUsersPage from './admin/features/users/AdminUsersPage';
import AdminReferenceNumberPage from './admin/features/referenceNumber/AdminReferenceNumberPage';
import Login2 from './features/auth/Login2';
import MissingPage from './features/missing/MissingPage';
import LocatePage from './features/missing/MissingLocatePage';
import NewMissingForm from './features/missing/NewMissingForm';
import NewFoundForm from './features/found/NewFoundForm';
import DonePage from './features/found/DonePage';
import MissingLocatePage from './features/missing/MissingLocatePage';
import FoundLocatePage from './features/found/FoundLocatePage';
import HomePage1 from './features/home/HomePage1';
import AdminEditUserForm from './admin/features/users/AdminEditUserForm';
import AdminNewUserForm from './admin/features/users/AdminNewUserForm';
import AdminEditUserLoad from './admin/features/users/AdminEditUserLoad';
import AdminNewFoundForm from './admin/features/report/AdminNewFoundForm';
import AdminNewMissingForm from './admin/features/report/AdminNewMissingForm';
import AdminNewFoundLoad from './admin/features/report/AdminNewFoundLoad';
import AdminNewMissingLoad from './admin/features/report/AdminNewMissingLoad';
import AdminEditFoundLoad from './admin/features/report/AdminEditFoundLoad';
import AdminEditMissingLoad from './admin/features/report/AdminEditMissingLoad';
import AdminItemLoad from './admin/features/report/AdminItemLoad';
import AdminClaimedReceipt from './admin/features/report/AdminClaimedReceipt';
import AdminClaimedReciptLoad from './admin/features/report/AdminClaimedReciptLoad';
import AdminDownloadReceipt from './admin/features/referenceNumber/AdminDownloadReceipt';
import AdminClaimedReportInfo from './admin/features/referenceNumber/AdminClaimedReportInfo';
import AdminReportInfo from './admin/features/report/AdminReportInfo';
// const socket = socketIOClient('http://localhost:3500');

function App() {
  return (
    <ChatProvider>
      <Routes>
          <Route path="/" element={<Layout/>} exact />
            {/* <Route path="/" element={<HomePage/>} exact /> */}

            {/* Public Routes */}
            <Route index element={<Public />}/>
            <Route path="/login" element={<Login />} />
            <Route element={<PersistLogin />}>
              
              <Route exact path="dash" element={<DashLayout/>}>
                <Route index element={<HomePage1 />} />
                {/* <Route path="chats" element={<ChatLoad/>} /> */}
                {/* <Route path="chats" element={<ChatVerify/>} /> */}
                <Route path="chats" element={<ChatPage/>} />
                <Route path="find" element={<FindPage/>} />
                <Route path="report">
                  <Route path=":id" element={<ItemPage/>}/>
                  <Route path="edit/:id" element={<EditReportForm/>}/>
                  <Route path="new" element={<NewReportForm />}/>
                </Route>
                
                <Route path="missing">
                  <Route index element={<MissingPage/>}/>
                  <Route path="locate" element={<MissingLocatePage/>}/>
                  <Route path="new" element={<NewMissingForm />}/>
                </Route>

                <Route path="found">
                  <Route path="new" element={<NewFoundForm/>}/>
                  <Route path="done" element={<DonePage/>}/>
                  <Route path="locate" element={<FoundLocatePage/>}/>
                </Route>
                
                <Route path='profile'>
                  <Route index element={<ProfilePageLoad/>}/>
                  <Route path='edit/:id' element={<ProfileEditForm/>}/>
                </Route> 
              </Route>
            </Route>
          
          <Route path="admin" element={<Layout/>}>

            {/* Admin Public Routes */}
            <Route index element={<AdminPublic/>}/>
            <Route path="login" element={<AdminLogin />} />
            <Route element={<AdminPersistLogin/>}>

              <Route element={<AdminRequireAuth />}> 
                <Route exact path="dash" element={<AdminDashLayout/>}>
                  <Route index element={<AdminDash />} />

                  <Route path="reports" >
                    <Route index element={<AdminReportPage/>} />
                    <Route path='found/new' element={<AdminNewFoundLoad/>} />
                    <Route path='found/:id' element={<AdminItemLoad/>} />
                    <Route path='found/info' element={<AdminReportInfo/>} />
                    <Route path='claimed/' element={<AdminClaimedReciptLoad/>} />
                    <Route path='missing/new' element={<AdminNewMissingLoad/>} />
                    <Route path='missing/info' element={<AdminReportInfo/>} />
                    <Route path='found/edit/:id' element={<AdminEditFoundLoad/>} />
                    <Route path='missing/edit/:id' element={<AdminEditMissingLoad/>} />
                  </Route>
                  
                    
                  <Route path="messages" element={<AdminMessagesPage/>} />

                  <Route path="users">
                    <Route index element={<AdminUsersPage/>}/>
                    <Route path="edit/:id" element={<AdminEditUserLoad/>}/>
                    <Route path="new" element={<AdminNewUserForm />}/>
                  </Route>
                  <Route path="referenceNumber">
                    <Route index element={<AdminReferenceNumberPage/>} />
                    <Route path='download' element={<AdminDownloadReceipt/>} />
                    <Route path='info' element={<AdminClaimedReportInfo/>} />
                  </Route>
                </Route>
              </Route>
            </Route>

          </Route>
        
      </Routes>
    </ChatProvider>
    
  )
}

export default App;
