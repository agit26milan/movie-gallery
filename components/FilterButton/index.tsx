import React, {useState} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

type FilterProps = {
    title?:string,
    menus: string[],
    onSelectMenu?: any
}

const FilterButton = (props:FilterProps) => {
    const {title, menus, onSelectMenu} = props
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
  
    return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          {title}
        </DropdownToggle>
        <DropdownMenu>
          {menus.map((menu, index) => (
            <DropdownItem onClick={() => onSelectMenu(menu)} key={index} >{menu} </DropdownItem>

          ))}
        </DropdownMenu>
      </Dropdown>
    );
}


export default FilterButton