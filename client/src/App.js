import './variables.css';
import { Route, Routes } from "react-router-dom";
import Index from "./containers/Index"
import Home from "./containers/Home";
import Details from "./containers/Details";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Index />} />
         <Route path="/home" element={<Home />} />
         <Route path="/country/:id" element={<Details />} />
      </Routes>
   );
}

export default App;
