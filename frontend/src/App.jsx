import { useEffect, useState } from "react";
// import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserRoutes from "./user/routes/UserRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";
import Container from "./user/components/Container";
import Navbar from "./admin/components/navbar/Navbar";
import Footer from "./user/components/footer/Footer";
import { useDispatch } from "react-redux";
import { getAllProductsThunk } from "./store/slice/productSlice";


function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(()=>{
  },[])
  return (
    <main className="relative">
        <Navbar/>
      <Container>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Container>
      <Footer/>
    </main>
  );
}

export default App;
