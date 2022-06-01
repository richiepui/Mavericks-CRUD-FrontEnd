import './App.css';
import HomePage from './components/homepage'
import LoginForm from './components/loginPage'
import ResponsiveAppBar from "./components/navBar"
import { Route, Routes, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar/>
          <LoginForm />
      </BrowserRouter>
    </div>
  );
}