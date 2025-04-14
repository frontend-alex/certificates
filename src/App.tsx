import { Route, Routes } from "react-router-dom";
import { MainPage } from "./routes/(root)";
import { NotFound } from "./routes/(error)";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="flex flex-col justify-between min-h-[100dvh]">
      <div>
        <Navbar />
        <div className="max-w-[110em] mx-auto p-5 w-full">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
