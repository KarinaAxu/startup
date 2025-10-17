import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import ScriptLoader from './components/ScriptLoader';
import AnchorRouter from './components/AnchorRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import MainMenu from './pages/MainMenu.jsx';
import Verification from './pages/Verification.jsx';
import Login from './pages/Login.jsx';
import InfoMenu from './pages/InfoMenu.jsx';
import Setting from './pages/Setting.jsx';
import Editcontract from './pages/Editcontract.jsx';
import Addcontract from './pages/Addcontract.jsx';
import Password from './pages/Password.jsx';

export default function App(){
  return (
    <Router>
      <Background />
      
      <AnchorRouter />
<Header />
      <main className='app-container'>
        <Routes>
          <Route path='/verification' element={<Verification />} />
          <Route path='/' element={<MainMenu />} />
          <Route path='/main-menu' element={<MainMenu />} />
          <Route path='/login' element={<Login />} />
          <Route path='/info-menu' element={<InfoMenu />} />
          <Route path='/infomenu' element={<InfoMenu />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/editcontract' element={<Editcontract />} />
          <Route path='/addcontract' element={<Addcontract />} />
          <Route path='/password' element={<Password />} />
        </Routes>
      </main>
      <Footer />
      <ScriptLoader />
    </Router>
  );
}
