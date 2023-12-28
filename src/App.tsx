import React from 'react';
import './App.css';
import { EmployeesList } from './components/EmployeesList/EmployeesList';

function App() {
  return (
    <div className='app'>
      <h1>Employees list</h1>
      <EmployeesList />
    </div>
  );
}

export default App;
