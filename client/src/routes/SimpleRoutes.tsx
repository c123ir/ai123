import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SimpleLayout from '../components/common/SimpleLayout';
import Home from '../pages/simple/Home';
import About from '../pages/simple/About';
import Contact from '../pages/simple/Contact';
import NotFound from '../modules/shared/components/NotFound';

/**
 * مسیرهای مربوط به وبسایت ساده
 */
const SimpleRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SimpleLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default SimpleRoutes; 