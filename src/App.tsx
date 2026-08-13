import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Configurator from './pages/Configurator';
import Products from './pages/Products';
import Subsidies from './pages/Subsidies';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#07101f] text-white">
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
      </div>
    </BrowserRouter>
  );
}
