import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from 'scenes/dashboard/index';
import Layout from 'scenes/layout/index';
import AddCattleToSale from "scenes/addCattleToSale/index";
import Staff from "scenes/staff/index";
import Doctor from "scenes/doctor/index";
import AllOnSaleCattle from 'scenes/onsalecattle/index';
import CattleList from 'scenes/cattleDetails';
import AddNewCattle from 'scenes/addNewCattle';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element = {<Navigate to="/dashboard" replace />} />
              <Route path='/dashboard' element = {<Dashboard />} />
              <Route path="/onsalecattle" element={<AllOnSaleCattle />} />
              <Route path="/cattlelist" element={<CattleList />} />
              <Route path="/addnewcattle" element={<AddNewCattle />} />
              <Route path="/addcattletosale" element={<AddCattleToSale />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/doctors" element={<Doctor />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
