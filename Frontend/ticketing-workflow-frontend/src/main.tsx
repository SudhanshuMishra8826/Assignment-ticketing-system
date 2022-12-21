import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './Pages/List';
import Card from './Pages/Card';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/ticket/:ticketId" element={<Card />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
