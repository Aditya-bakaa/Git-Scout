import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scout/:username" element={<Profile />} />
    </Routes>
  );
}

export default App;
