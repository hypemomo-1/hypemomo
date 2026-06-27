import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Layout } from './components/Layout';
import { ReviewForm } from './components/ReviewForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LayoutOutlet({ onOpenReview }: { onOpenReview: () => void }) {
  return (
    <Layout onOpenReview={onOpenReview}>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  const [reviewOpen, setReviewOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route element={<LayoutOutlet onOpenReview={() => setReviewOpen(true)} />}>
          <Route path="/home" element={<Home onOpenReview={() => setReviewOpen(true)} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <ReviewForm isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
    </BrowserRouter>
  );
}
