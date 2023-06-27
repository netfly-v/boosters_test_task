import React from 'react';
import 'modern-normalize';
import {BrowserRouter} from 'react-router-dom';
import {AppLayout} from './components/Layout';
import {AppRouter} from './Router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
};

export default App;
