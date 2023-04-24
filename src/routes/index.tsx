import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "pages/Search";
import User from "pages/User";

const AppRouter: React.FC = () => {
  return (
    <div className="w-screen flex flex-row justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/users/:username" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
