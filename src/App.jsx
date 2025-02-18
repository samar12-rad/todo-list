import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Input1 from "./pages/Input1";
import Input2 from "./pages/Input2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input1" element={<Input1 />} />
        <Route path="/input2" element={<Input2 />} />
      </Routes>
    </Router>
  );
}

export default App;
