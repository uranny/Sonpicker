import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/main'
import SignDetailPage from './pages/sign/detail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign/:id" element={<SignDetailPage/>} />
    </Routes>
  );
}

export default App
