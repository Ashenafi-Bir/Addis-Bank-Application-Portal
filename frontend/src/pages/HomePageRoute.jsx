import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from '../componnets/CommonPageLayouts/mainpage/Main';
import Production from '../componnets/HomePageLayouts/Production/Production';
import Communication from '../componnets/HomePageLayouts/Communication/Communication';
import Reporting from '../componnets/HomePageLayouts/Reporting/Reporting';
import Other from '../componnets/HomePageLayouts/Other/Other';
import Header from '../componnets/CommonPageLayouts/Header/Header';
import Sidebar from '../componnets/CommonPageLayouts/sidebar/Sidebar';

function HomePageRoute() {
  return (
    <>  
    <Header/>
    <Sidebar/>
    <Routes>
      <Route path="" element={<Main />} />
      <Route path="communication" element={<Communication />} />
      <Route path="production" element={<Production />} /> 
      <Route path="reporting" element={<Reporting />} />
      <Route path="other" element={<Other />} /> 
    </Routes>
    </>
  );
}

export default HomePageRoute;
