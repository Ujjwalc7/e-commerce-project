import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SideNavbar from "../SideNavbar";
import { useEffect, useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SideCartbar from "../side cartbar/SideCartbar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slice/authSlice";
import { clearCart } from "../../../store/slice/cartSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCartbar, setOpenCartbar] = useState(false);
  const loggedIn = useSelector(state=>state.auth.isAuthenticated);
  const cartItems = useSelector(state=>state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSidebar = () => {
    setOpen((prev) => !prev);
    document.body.style.overflow = open ? "auto" : "hidden";``
  };
  const handleCartbar = () => {
    setOpenCartbar((prev) => !prev);
    document.body.style.overflow = openCartbar ? "auto" : "hidden";
  };

  const handleLogout=() => {
    localStorage.removeItem("jwt");
    dispatch(clearCart());
    dispatch(logout());
  };

  useEffect(()=>{
    setOpen(false);
    setOpenCartbar(false);
    document.body.style.overflow = "auto";
  },[navigate])

  return (
    <nav className="w-full z-[100] max-[1100px]:px-6 py-6 bg-violet-300 shadow-md  max-[1100px]:py-3">
      <div className="xl:w-[1500px] xl:m-auto flex justify-around max-[1100px]:justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to={"/"}
            className="w-[150px] rounded-md overflow-hidden cursor-pointer max-[1100px]:w-[100px]"
          >
            <img
              className="w-full h-full object-contain object-center"
              src={logo}
              alt=""
            />
          </Link>
          <div className="flex gap-3 items-center max-[1100px]:hidden">
            <Link to={"/collection/shirts"}>Shirts</Link>
            <Link to={"/collection/tshirts"}>T-shirts</Link>
            <Link to={"/collection/bottoms"}>Bottoms</Link>
            <Link to={"/collection/shorts"}>Shorts</Link>
            <Link to={"/collection/winter wear"}>Jackets</Link>
          </div>
        </div>
        <div className="w-[300px] max-[1100px]:hidden">
          <form role="search">
            <input
              className="input-search"
              id="search"
              type="search"
              placeholder="Search..."
              required
            />
            <button className="-btn" type="submit">
              Go
            </button>
          </form>
        </div>
        <div className="flex gap-3 max-[1100px]:hidden items-center">
          <div className="cursor-pointer relative h-[30px] text-center mr-3" onClick={handleCartbar}>
          <ShoppingCartIcon/>
          {cartItems?.length > 0 && <span className="absolute -top-3 -right-3 text-white bg-red-400 rounded-full flex justify-center items-center w-[20px] h-[20px] font-semibold">
            {cartItems?.length}
          </span>}
          </div>
          {!loggedIn ? (<Link to={'/login'} className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1">
            Login
          </Link>)
          :
          (<button className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1" 
          onClick={handleLogout}>
            Logout
          </button>)}
        </div>
        <div className="max-[1100px]:flex items-center gap-5 hidden">
          <div className="cursor-pointer" onClick={handleCartbar}>
            <ShoppingCartIcon/>
          </div>
          <div className="cursor-pointer" onClick={handleSidebar}>
          <MenuIcon />
          </div>
        </div>
        <SideNavbar open={open} handleSidebar={handleSidebar} />
        <SideCartbar handleCartbar={handleCartbar} openCartbar={openCartbar}/>
      </div>
    </nav>
  );
};
export default Navbar;
