import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import { AllProvider } from "./Context";
import ProjectDetailsPage from "./pages/ProjectDetails";
import DigitalLibrary from "./pages/Page2";
import BookDetails from "./pages/BookDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <AllProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />
            <Route path="/DigitalLibrary" element={<DigitalLibrary />} />
            <Route path="/BookDetails/:id" element={<BookDetails />} />
          </Routes>
        </AllProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
