import { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import axios from 'axios';
import { ScanLine, CheckCircle, XCircle, Search } from 'lucide-react';

export default function VerificationPage() {
  const [manualId, setManualId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // We only want to initialize the scanner if we are not showing a result
    if (!verificationResult) {
      // Removed the square qrbox restriction so it can easily scan wide 1D barcodes
      const scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.EAN_13
        ]
      }, false);

      scanner.render(onScanSuccess, onScanError);

      function onScanSuccess(decodedText) {
        scanner.clear();
        handleVerification(decodedText.trim());
      }

      function onScanError(err) {
        // Ignore continuous scanning errors
      }

      return () => {
        scanner.clear().catch(error => console.error('Failed to clear scanner', error));
      };
    }
  }, [verificationResult]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      handleVerification(manualId.trim());
    }
  };

  const handleVerification = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/verify`, { productId });
      setVerificationResult(response.data);
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to connect to verification server.');
    }
    setLoading(false);
  };

  const resetScanner = () => {
    setVerificationResult(null);
    setManualId('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <ScanLine className="h-8 w-8 text-slate-800" />
          <h2 className="text-2xl font-bold text-slate-900">Verify Product Authenticity</h2>
        </div>

        {!verificationResult ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">Scan QR Code or Barcode</h3>
              {/* Added key to force re-render when needed, though conditional rendering handles it mostly */}
              <div id="reader" className="w-full overflow-hidden rounded-lg border-2 border-slate-200 bg-slate-50 min-h-[300px]"></div>
              <p className="text-sm text-slate-500 mt-2 text-center">Point your camera at the product QR code or barcode</p>
            </div>

            <div className="flex flex-col justify-center">
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-slate-300"></div>
                <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-slate-300"></div>
              </div>

              <h3 className="text-lg font-semibold mb-4 text-slate-800">Enter Product ID</h3>
              <form onSubmit={handleManualSubmit}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualId}
                    onChange={(e) => setManualId(e.target.value)}
                    placeholder="e.g. PROD-A1B2C3D4"
                    className="flex-grow px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition uppercase"
                  />
                  <button type="submit" disabled={loading} className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition disabled:bg-slate-400 cursor-pointer flex items-center justify-center">
                    {loading ? '...' : <Search className="h-5 w-5" />}
                  </button>
                </div>
              </form>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              
              <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm text-slate-800 font-medium mb-1">Need help?</p>
                <p className="text-xs text-slate-600">Ensure the QR code or barcode is well-lit and fully visible within the camera frame. If scanning fails, locate the Product ID printed below it and enter it manually.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in duration-300">
            {verificationResult.isGenuine ? (
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center shadow-sm">
                <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
                <h3 className="text-3xl font-bold text-green-700 mb-2">Genuine Product</h3>
                <p className="text-green-600 mb-6">This product's cryptographic hash matches the official simulated blockchain record.</p>
                
                <div className="bg-white p-6 rounded-lg border border-green-200 text-left max-w-md mx-auto shadow-sm">
                  <h4 className="font-bold text-slate-800 border-b border-slate-100 pb-2 mb-3">Product Details</h4>
                  <ul className="space-y-2 text-sm">
                    <li><span className="text-slate-500 w-32 inline-block">Product ID:</span> <span className="font-mono font-medium text-slate-800">{verificationResult.data.productId}</span></li>
                    <li><span className="text-slate-500 w-32 inline-block">Name:</span> <span className="font-medium text-slate-800">{verificationResult.data.productName}</span></li>
                    <li><span className="text-slate-500 w-32 inline-block">Brand:</span> <span className="font-medium text-slate-800">{verificationResult.data.brand}</span></li>
                    <li><span className="text-slate-500 w-32 inline-block">Batch No:</span> <span className="font-medium text-slate-800">{verificationResult.data.batchNumber}</span></li>
                    <li><span className="text-slate-500 w-32 inline-block">Mfg Date:</span> <span className="font-medium text-slate-800">{new Date(verificationResult.data.manufacturingDate).toLocaleDateString()}</span></li>
                    <li className="pt-2 mt-2 border-t border-slate-100 break-all"><span className="text-slate-500 block mb-1">SHA-256 Hash:</span> <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded block">{verificationResult.data.productHash}</span></li>
                  </ul>
                </div>
                
                <button onClick={resetScanner} className="mt-8 bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition cursor-pointer shadow-sm">
                  Scan Another Product
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-8 text-center shadow-sm">
                <XCircle className="mx-auto h-20 w-20 text-red-500 mb-4" />
                <h3 className="text-3xl font-bold text-red-700 mb-2">Fake Product Detected</h3>
                <p className="text-red-600 mb-6">WARNING: This Product ID does not exist on the official network.</p>
                
                <div className="bg-white p-6 rounded-lg border border-red-200 shadow-sm inline-block">
                  <p className="text-slate-600">The product you scanned is likely counterfeit. Please report this to the manufacturer.</p>
                </div>
                
                <div className="mt-8">
                  <button onClick={resetScanner} className="bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700 transition cursor-pointer shadow-sm">
                    Scan Another Product
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
