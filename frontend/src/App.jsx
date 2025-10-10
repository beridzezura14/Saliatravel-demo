import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import ChangePassword from "./pages/ChangePassword";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
import TourDetails from "./pages/TourDetails";
import ToursSection from "./components/tours/ToursSection";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

import { useState, useEffect } from "react";
import gsap from "gsap";
import plane from "./assets/loader.png";
import API from "./api/api"; // 👈 დავამატეთ შენი API import

function App() {
  const [loading, setLoading] = useState(true);
  const firstname = "Salia".split("");
  const lastname = "Travel".split("");


  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const imageUrls = [plane, "/images/dubai.jpg", "/images/paris.jpg"];
        await Promise.all(
          imageUrls.map(
            (src) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve;
              })
          )
        );

        // API preload (შეგიძლია რაც გინდა დაამატო)
        await Promise.all([
          API.get("/places").catch(() => {}),
          API.get("/countries").catch(() => {}),
        ]);

        // Loader-ის დრო — თუ ყველაფერი სწრაფად ჩაიტვირთა მაინც ჰქონდეს სმუთ ეფექტი
        setTimeout(() => {
          setLoading(false);
        }, 2200);
      } catch (err) {
        console.error("Preload error:", err);
        setLoading(false);
      }
    };

    preloadAssets();
  }, []);

  // 🔹 Loader-ის GSAP ანიმაცია — შენსითვე დავტოვე უცვლელად
  useEffect(() => {
    gsap.fromTo(
      ".plane",
      { x: "-100vw" },
      { x: "100vw", duration: 2.7 }
    );

    gsap.fromTo(
      ".char",
      { opacity: 0, scale: 0 },
      {
        delay: 0.3,
        opacity: 1,
        scale: 1,
        duration: 2.1,
        stagger: 0.1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      ".slogan",
      { opacity: 0, y: 30 },
      { delay: 1.1, opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  // 🔹 Loader კომპონენტი — სტილები უცვლელი
  if (loading) {
    return (
      <div className="loader">
        <img className="plane" src={plane} alt="" />
        <div>
          {firstname.map((a, i) => (
            <h1 className="char" key={i}>
              {a}
            </h1>
          ))}
          {lastname.map((a, i) => (
            <span className="char span" key={i}>
              {a}
            </span>
          ))}
          <p className="slogan font-colasta">
            Where the heart finds its home
          </p>
        </div>
      </div>
    );
  }

  // 🔹 ძირითადი აპი — ტვირთავს მხოლოდ მაშინ როცა ყველა რესურსი მზადაა
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/tours" element={<ToursSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/change-password"
          element={
            <AdminRoute>
              <ChangePassword />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
