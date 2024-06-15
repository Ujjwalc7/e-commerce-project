import { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useLocation, useNavigate } from "react-router-dom";


const Dropdown = ({ item, params }) => {
  const [options, setOptions] = useState(item.options);
  const [drop, setDrop] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  let filterValue = query.getAll(item.id);

  const handleChange = (index, checkbox, value) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      checked: !newOptions[index].checked,
    };
    setOptions(newOptions);
    if (!checkbox) {
      updateUrl(item.id, value, true);
    } else {
      updateUrl(item.id, value, false);
    }
  };

  const updateUrl = (id, value, check) => {
    let para;
    if (check) {
      filterValue.push(value);
      query.set(id, filterValue.join(','));
      para = query.toString();
      navigate({ search: `?${para}` });
    } else {
      if(filterValue[0].split(',').includes(value)) {
        filterValue = filterValue[0].split(',').filter(item => item !== value);
        if(filterValue.length === 0){
          query.delete(id);
        }else{
          query.set(id, filterValue.join(','));
        }
        para = query.toString();
        navigate({ search: `?${para}` });
      }
    }
  };

  useEffect(() => {
    setOptions(item.options);
    setDrop(false);
  }, [params]);

  return (
    <li className="relative border-b pb-3 pt-3">
      <div
        className="flex mb-2 items-center cursor-pointer"
        onClick={() => setDrop(!drop)}
      >
        <ArrowRightIcon />
        <h6 className="m-0 text-[14px]">{item.name}</h6>
      </div>
      {drop && (
        <ul className="dropdown w-full flex flex-col pl-[10px] gap-2">
          {options.map((option, index) => (
            <li key={option.value} className="flex gap-1 text-sm">
              <input
                type="checkbox"
                name={item.id}
                value={option.value}
                id={option.value}
                onChange={() =>
                  handleChange(index, option.checked, option.value)
                }
              />
              <label htmlFor={option.value}>{option.label}</label>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
export default Dropdown;





 