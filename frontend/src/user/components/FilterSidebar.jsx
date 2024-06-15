import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Dropdown from './DropDown';
import { bottomstFilter, shirtFilter } from '../../store/services/filter';
import './filterSidebar.css';


const FilterSidebar = ({sidebar, category, toggleSidebar}) => {
  return (
    <div className={`sidebar flex-col z-[200] px-2 py-3 gap-5 overflow-y-scroll h-[100vh] absolute top-0 bg-white border-r transition-all ${sidebar ? 'flex left-0' : ' -left-[500px]'}`}>
        <div onClick={toggleSidebar}>
        <MenuOpenIcon className="absolute top-3 right-3 z-[100] cursor-pointer"/>
        </div>
        <ul className="flex flex-col w-[300px] bg-white">
            {category === "bottoms" || category === "shorts" ? (bottomstFilter.map((item) => (
              <Dropdown key={item.id} item={item} params={category} />
            ))):(shirtFilter.map((item) => (
              <Dropdown key={item.id} item={item} params={category} />
            )))}
          </ul>
    </div>
  )
}
export default FilterSidebar