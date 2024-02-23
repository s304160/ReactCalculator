import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

import './App.css';

import { Home } from "./components/Home"


function App() {
	return (
		<Home className="home" />
	);
}

export default App;
