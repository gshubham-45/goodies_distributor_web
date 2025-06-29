
import './App.css';
import Header from './pages/Header';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/event" element={<CreateEvent />} />
      </Routes>
    </>);
}

export default App;
