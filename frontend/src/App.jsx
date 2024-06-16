import { useEffect, useState } from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./user/routes/UserRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";
import Container from "./user/components/Container";
import Navbar from "./user/components/navbar/Navbar";
import Footer from "./user/components/footer/Footer";
import { useDispatch } from "react-redux";
import { getAllProductsThunk } from "./store/slice/productSlice";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import { getUserByJwtThunk, logout } from "./store/slice/authSlice";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const getUser = async () => {
    try {
      if (jwt) {
        dispatch(getUserByJwtThunk(jwt));
        // navigate('/');
        setLoading(false);
      } else {
        localStorage.removeItem("jwt");
        dispatch(logout());
        setLoading(false);
      }
    } catch (error) {
        console.log(error);
        localStorage.removeItem("jwt");
        dispatch(logout());
        setLoading(false);
    }
  };
  useEffect(()=>{
    getUser();
  },[])
  return !loading && (
    <main className="overflow-hidden relative">
        <Navbar/>
      <Container>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Container>
      <Footer/>
    </main>
  );
}

export default App;
