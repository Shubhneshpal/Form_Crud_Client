import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import NoPage from "./pages/NoPage"
import { Provider } from 'react-redux';
import { store } from './redux/store';



function App() {
  return (
    <>
    <Provider store={store}>
     <BrowserRouter>    
     <Routes>     
        <Route index path="/" element={<Home />}/>
        <Route  path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />        
      </Routes>     
     </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
