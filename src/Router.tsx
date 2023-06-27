import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {About} from './components/About';
import {Stats} from './components/Stats';
import {route} from './constants/route';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={route.main} element={<Stats />} />
      <Route path={route.about} element={<About />} />
    </Routes>
  );
};
