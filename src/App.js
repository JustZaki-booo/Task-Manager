import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import TodoList from './components/TodoList';
import About from './components/About';
import Navbar from './components/Navbar';

function App() {

const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <Navbar onSearchChange={setSearchTerm} />
      <Routes>
        <Route path="/" element={<TodoList searchTerm={searchTerm} />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
