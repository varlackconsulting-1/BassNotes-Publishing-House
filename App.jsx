import React from 'react';
import { Navigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop';
import SiteHeader from './components/site/SiteHeader';
import SiteFooter from './components/site/SiteFooter';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './hooks/useCart';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import MusicPage from './pages/MusicPage';
import VideosPage from './pages/VideosPage';
import AboutPage from './pages/AboutPage';
import AuthorPage from './pages/AuthorPage';
import ServicesPage from './pages/ServicesPage';
import PartnersPage from './pages/PartnersPage';
import ShopPage from './pages/ShopPage';
import StorePage from './pages/StorePage';
import CosomniaPage from './pages/CosomniaPage';
import SuperBassHeroesPage from './pages/SuperBassHeroesPage';
import ContactPage from './pages/ContactPage';
import BookstorePage from './pages/BookstorePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import LibraryPage from './pages/LibraryPage';
import CheckoutFlowPage from './pages/CheckoutFlowPage';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <SiteHeader />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cosomnia" element={<CosomniaPage />} />
                        <Route path="/super-bass-heroes" element={<SuperBassHeroesPage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/music" element={<MusicPage />} />
                        <Route path="/videos" element={<VideosPage />} />
                        <Route path="/music-video" element={<Navigate to="/music" replace />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/author" element={<AuthorPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/partners" element={<PartnersPage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/store" element={<StorePage />} />
                        <Route path="/bookstore" element={<BookstorePage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/account/library" element={<LibraryPage />} />
                        <Route path="/checkout-flow" element={<CheckoutFlowPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                    <SiteFooter />
                    <ShoppingCart />
                    <Toaster theme="light" position="bottom-center" richColors />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
