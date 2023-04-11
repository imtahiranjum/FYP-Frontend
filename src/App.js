import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import React, { Component }  from 'react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '/client/src/scenes/dashboard/index.jsx';
import Layout from '/client/src/scenes/layout/index.jsx';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider> theme={theme}
          <CssBaseline />
          <Routes>
            <Route element={<layout />}>
              <Route path='/' element = {<Navigate to="/dashboard" replace />} />
              <Route path='/dashboard' element = {<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
