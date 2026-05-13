import { Link } from 'react-router-dom';
import { ShieldCheck, PlusCircle, ScanLine, Database } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      <ShieldCheck className="mx-auto h-20 w-20 text-primary mb-6" />
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
        Blockchain Product Verification
      </h1>
      <p className="max-w-2xl text-xl text-slate-500 mb-8">
        Ensure the authenticity of your products using immutable cryptographic hashes. Prevent counterfeiting and build consumer trust.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mt-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <PlusCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Manufacturer</h2>
          <p className="text-slate-600 mb-6 flex-grow">Register new products to the simulated blockchain network and generate secure QR codes.</p>
          <Link to="/add" className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-800 transition text-center">
            Go to Dashboard
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
          <div className="bg-primary/10 p-4 rounded-full mb-4">
            <ScanLine className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Consumer</h2>
          <p className="text-slate-600 mb-6 flex-grow">Scan product QR codes or enter IDs manually to instantly verify authenticity.</p>
          <Link to="/verify" className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition text-center">
            Verify a Product
          </Link>
        </div>
      </div>
      
      <div className="mt-16 max-w-3xl text-left bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-slate-800">
          <Database className="h-5 w-5 text-slate-500" />
          How to use this system
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          If you are a manufacturer, navigate to the Dashboard to register new items and generate secure QR codes and barcodes. If you are a consumer, head to the Verification page and use your camera to scan the QR code or barcode on your product to instantly verify its authenticity against our secure records.
        </p>
      </div>
    </div>
  );
}
