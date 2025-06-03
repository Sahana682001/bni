import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import MemberProfile from "./components/MemberProfile/MemberProfile";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Inner component where useLocation is valid
function AppRoutes() {
  const location = useLocation();
  const fullWidthRoutes = ["/login", "/dashboard"];
  const isFullWidth = fullWidthRoutes.includes(location.pathname);

  return (
    <div
      className="app-container"
      style={{ maxWidth: isFullWidth ? "100%" : "1080px", margin: "0 auto", height: "1920px"}}
    >
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members/:id" element={<MemberProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout />} />
          <Route path="/" element={<Layout />} />
        </Route>
      </Routes>
      <Footer className="custom-footer text-light py-2"  />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
