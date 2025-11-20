import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Index from './pages/Index';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
