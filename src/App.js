import './App.css';
import Employe from './Components/AddData/employe';
import CustomerForm from './Components/Form/Form';
import EditEmployee from "./Components/AddData/EditEmployee"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Employe />} />
        <Route path='/form'  element={<CustomerForm />} />
        <Route path='/edit/form'  element={<EditEmployee />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
