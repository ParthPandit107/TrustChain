import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, ScanLine } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl tracking-tight">TrustChain</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/add" className="text-slate-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1">
                <PlusCircle className="h-4 w-4" /> Manufacturer
              </Link>
              <Link to="/verify" className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-1 shadow-sm transition-colors">
                <ScanLine className="h-4 w-4" /> Verify Product
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        <p>Blockchain-Based Fake Product Identification System MVP &copy; 2026</p>
      </footer>
    </div>
  );
};

export default Layout;
