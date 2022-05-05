import './variables.css';
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
      </Routes>
   );
}

export default App;
