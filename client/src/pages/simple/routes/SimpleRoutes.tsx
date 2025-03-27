import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SimpleLayout from '../../../components/common/SimpleLayout';
import Home from '../Home';
import About from '../About';
import Contact from '../Contact';
import NotFound from '../../../modules/shared/components/NotFound';

const SimpleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<SimpleLayout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default SimpleRoutes; 