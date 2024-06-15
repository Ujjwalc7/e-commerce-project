import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from "/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SideNavbar from "../SideNavbar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleSidebar = () => {
    setOpen((prev) => !prev);
  };

  useEffect(()=>{
    setOpen(false);
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
        <div className="flex gap-4 max-[1100px]:hidden">
          <button className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1">
            Login
          </button>
          <button className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1">
            Logout
          </button>
        </div>
        <div
          className="max-[1100px]:block hidden cursor-pointer"
          onClick={handleSidebar}
        >
          <MenuIcon />
        </div>
        <SideNavbar open={open} handleSidebar={handleSidebar} />
      </div>
    </nav>
  );
};
export default Navbar;
