import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './routes/Home'
import { Contact } from './routes/Contact'
import { Quote } from './routes/Quote'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<div className="p-8 text-center">Products Page - Coming Soon</div>} />
          <Route path="/pricing" element={<div className="p-8 text-center">Pricing Page - Coming Soon</div>} />
          <Route path="/process" element={<div className="p-8 text-center">Process Page - Coming Soon</div>} />
          <Route path="/gallery" element={<div className="p-8 text-center">Gallery Page - Coming Soon</div>} />
          <Route path="/partners" element={<div className="p-8 text-center">Partners Page - Coming Soon</div>} />
          <Route path="/about" element={<div className="p-8 text-center">About Page - Coming Soon</div>} />
          <Route path="/blog" element={<div className="p-8 text-center">Blog Page - Coming Soon</div>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App