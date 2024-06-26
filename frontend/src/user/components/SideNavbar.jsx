import { Link, useNavigate } from "react-router-dom"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from "/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slice/authSlice";


const SideNavbar = ( {open, handleSidebar}) => {
  const loggedIn = useSelector(state=>state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <nav className={`flex-col z-[200] px-2 py-3 gap-5 h-[100vh] absolute top-0 bg-white border-r transition-all ${open ? 'flex left-0' : ' -left-[500px]'}`}>
        <Link to={'/'} className="rounded-md overflow-hidden cursor-pointer w-[100px] absolute left-3 top-3" >
          <img
            className="w-full h-full object-contain object-center"
            src={logo}
            alt=""
          />
        </Link>
        <div onClick={handleSidebar}>
        <MenuOpenIcon className="absolute top-3 right-3 z-[100] cursor-pointer"/>
        </div>
        <div className="w-[300px] border rounded-xl mt-8">
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
        <div className="flex flex-col gap-3 px-6">
          <Link to={"/"}>Home</Link>
          <Link to={"/collection/shirts"}>Shirts</Link>
          <Link to={"/collection/tshirts"}>T-shirts</Link>
          <Link to={"/collection/bottoms"}>Bottoms</Link>
          <Link to={"/collection/shorts"}>Shorts</Link>
          <Link to={"/collection/winter wear"}>Jackets</Link>
        </div>
        <div className="flex gap-4">
        {!loggedIn ? (<button className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1" onClick={()=>navigate('/login')}>
          Login
        </button>)
        :
        (<button className="bg-black text-white rounded-lg px-4 active:opacity-70 py-1" onClick={()=>{
          localStorage.removeItem('jwt')
          dispatch(logout())
          handleSidebar()}
          }>
          Logout
        </button>)}
      </div>

    </nav>
  )
}
export default SideNavbar