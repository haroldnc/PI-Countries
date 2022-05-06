import './variables.css';
import { Route, Routes } from "react-router-dom";
import Index from "./containers/Index"
import Home from "./containers/Home";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Index />} />
         <Route path="/home" element={<Home />} />
      </Routes>
   );
}

export default App;
