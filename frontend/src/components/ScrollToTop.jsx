import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // ახალ გვერდზე ზედა ნაწილში გადაყავს
  }, [pathname]);

  return null;
}
