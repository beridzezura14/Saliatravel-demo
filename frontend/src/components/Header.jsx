import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./header.scss"

import logo from '../assets/img/logo.png'
import fb from '../assets/img/fb.png'
import insta from '../assets/img/insta.png'
import tiktok from '../assets/img/tiktok.png'
import headerdecor from '../assets/img/headerdecor.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('token'))
  const navigate = useNavigate()

  // Burger toggle
  const toggleMenu = () => setIsOpen(!isOpen)

  // Watch localStorage changes (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token')
      setIsAdmin(!!token)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAdmin(false)
    navigate('/admin/login')
    setIsOpen(false) // menu დახურეთ logout-ზე
  }

  // Link click-ზე მენუს დახურვა
  const handleLinkClick = () => setIsOpen(false)

  return (
    <div className='header'>
      <div className='header-content'>
        <Link to="/" onClick={handleLinkClick}>
          <img src={logo} className='logo' alt="logo" />
        </Link>

        <nav className={isOpen ? 'nav-bar active' : 'nav-bar'}>
          <ul>
            <Link to="/" onClick={handleLinkClick}><li>მთავარი</li></Link>
            <Link to="/about" onClick={handleLinkClick}><li>ჩვენს შესახებ</li></Link>
            <Link to="/toursPage" onClick={handleLinkClick}><li>ტურები</li></Link>
            <Link to="/contact" onClick={handleLinkClick}><li>საკონტაქტო</li></Link>

            <Link to="/admin" className="hover:underline" onClick={handleLinkClick}>
              {/* Admin */}
            </Link>

            {isAdmin && (
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            )}
          </ul>

          <ul className='menu-additon-info'>
            <li><ion-icon name="location-outline"></ion-icon>2 Leonidze street Tbilisi, Georgia</li>
            <li><ion-icon name="call-outline"></ion-icon>+995 557 17 17 06</li>
            <li className='icons'>
              <a href="https://www.facebook.com/profile.php?id=100076234376477" target='_blank'><img src={fb} alt="fb" /></a>
              <a href="https://www.instagram.com/saliatravel/" target='_blank'><img src={insta} alt="insta" /></a>
              <a href="https://www.tiktok.com/@saliatravel?_t=8sR5boVvKbd&_r=1" target='_blank'><img src={tiktok} alt="tiktok" /></a>
            </li>
          </ul>
        </nav>

        <div className='burger' onClick={toggleMenu}>
          <div className={isOpen ? 'line line1 active' : 'line'}></div>
          <div className={isOpen ? 'line line2 active' : 'line line2'}></div>
          <div className={isOpen ? 'line line3 active' : 'line'}></div>
        </div>
      </div>

      <div className='decor-header'>
        <img src={headerdecor} alt="decoration header" />
        <div className='space'> </div>
      </div>
    </div>
  )
}
