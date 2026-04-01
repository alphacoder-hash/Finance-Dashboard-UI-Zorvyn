import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import ToastContainer from './components/shared/Toast';

import RoleGuard from './components/shared/RoleGuard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ToastContainer />
        <RoleGuard>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
            </Routes>
          </Layout>
        </RoleGuard>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
