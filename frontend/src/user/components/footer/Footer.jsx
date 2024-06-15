import { Link } from "react-router-dom";
import './style.css';
const footerLinks = [
    {id: 1, name: 'Shirts', link: '/collections/shirts'},
    {id: 3, name: `T-shirts`, link: '/collections/t-shirts'},
    {id: 4, name: `Bottoms`, link: '/collections/bottoms'},
    {id: 5, name: 'Shorts', link: '/collections/shorts'},
    {id: 6, name: 'Jackets', link: '/collections/jackets'},
]

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer >
        <hr />
        <div className="mt-16">
            <div className="mb-10">
                <div className="flex mb-3 w-full justify-center">
                <input type="email" className="border-b border-black/35 py-1 px-2 outline-none" name="email" placeholder="Enter your email" />
                <p className="cursor-pointer border-b border-black/35">Subscribe</p>
                </div>
            <p>Sign up now and be the first to know about exclusive offers, latest fashion trends & style tips!</p>
            </div>
          <div className="w-full flex gap-5 md:gap-10 justify-center" >
            {footerLinks.map((item)=>{
                const {id, name, link} = item;
                return (
                    <div className="" key={id}>
                        <p>
                            <Link to={link}>
                                {name}
                            </Link>
                        </p>
                    </div>
                )
                })}
          </div>
          <div>
            <p className="mt-3 mb-2 tracking-widest">CUSTOMER CARE</p>
            <p className="m-1 text-[13px]">Timings: 10 AM - 7PM (Mon - Sat)</p>
            <p className="m-1 text-[13px]">Whatsapp: +916666444221</p>
            <p className="m-1 text-[13px]">Instagram: @urbanthread.co.in</p>
          </div>
          <div className="copyright text-[13px]">Copyright @Urban Thread {year}</div>
        </div>
      </footer>
  )
}
export default Footer