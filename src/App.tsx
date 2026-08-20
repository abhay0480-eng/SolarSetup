import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Configurator from './pages/Configurator';
import Products from './pages/Products';
import Subsidies from './pages/Subsidies';
import About from './pages/About';
import WhatsAppButton from './components/layout/WhatsAppButton';
import MobileCTABar from './components/layout/MobileCTABar';
import { LanguageProvider } from './i18n/LanguageContext';
import { ThemeProvider } from './theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-canvas text-foreground pb-16 sm:pb-0">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/configurator" element={<Configurator />} />
                <Route path="/products" element={<Products />} />
                <Route path="/subsidies" element={<Subsidies />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Home />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <MobileCTABar />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
