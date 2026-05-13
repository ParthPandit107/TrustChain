import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import AddProductPage from './pages/AddProductPage';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="add" element={<AddProductPage />} />
          <Route path="verify" element={<VerificationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
