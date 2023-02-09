import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './BookList';
import BookEdit from './BookEdit';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<BookList />} />
          <Route path='/books/:id' element={<BookEdit />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
