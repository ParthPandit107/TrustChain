import { useState } from 'react';
import axios from 'axios';
import { PackagePlus, CheckCircle2 } from 'lucide-react';
import Barcode from 'react-barcode';


export default function AddProductPage() {
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    batchNumber: '',
    manufacturingDate: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/api/products`, formData);
      setResult(response.data.data);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Is the server running?');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <PackagePlus className="h-8 w-8 text-slate-800" />
          <h2 className="text-2xl font-bold text-slate-900">Manufacturer Dashboard</h2>
        </div>
        
        {!result ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
              <input required type="text" name="productName" onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition" placeholder="e.g. AirMax Infinity" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                <input required type="text" name="brand" onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Batch Number</label>
                <input required type="text" name="batchNumber" onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Manufacturing Date</label>
              <input required type="date" name="manufacturingDate" onChange={handleChange} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea name="description" onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"></textarea>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-800 transition mt-6 disabled:bg-slate-400 cursor-pointer">
              {loading ? 'Processing...' : 'Register Product to Blockchain'}
            </button>
          </form>
        ) : (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Product Registered!</h3>
            <p className="text-slate-500 mb-6">The product has been securely logged with a SHA-256 hash.</p>
            
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-6 inline-block w-full max-w-sm mx-auto">
              <p className="text-sm text-slate-500 mb-1">Product ID</p>
              <p className="font-mono font-bold text-lg text-slate-800 mb-4">{result.productId}</p>
              
              <p className="text-sm text-slate-500 mb-2">Generated QR Code</p>
              <img src={result.qrCodeUrl} alt="QR Code" className="mx-auto border border-slate-200 rounded-lg p-2 bg-white mb-4" />
              
              <p className="text-sm text-slate-500 mb-2">Generated Barcode</p>
              <div className="flex justify-center bg-white p-2 border border-slate-200 rounded-lg">
                <Barcode 
                  value={result.productId} 
                  width={3} 
                  height={60} 
                  displayValue={true} 
                  background="#ffffff" 
                  lineColor="#000000" 
                  margin={10} 
                />
              </div>
              
              <p className="text-xs text-slate-400 mt-4">Print either of these and attach to the product</p>
            </div>
            
            <button onClick={() => setResult(null)} className="w-full bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-lg hover:bg-slate-300 transition cursor-pointer">
              Add Another Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
