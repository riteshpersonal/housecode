
import MenuIcon from "@/Icons/MenuIcon";
import DropdownUser from "./DropdownUser";


const Header = (props) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white shadow ">
      <div className="flex flex-grow items-center justify-between w-full px-4 py-3.5 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden ">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm   lg:hidden"
          >
            <MenuIcon />
          </button>
        
        </div>

        {/* start of notification and user area-------------------------------- */}
        <div className="flex items-center justify-end gap-3 2xsm:gap-7 w-full">
        

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
        {/* end of notification and user area-------------------------------- */}
      </div>
    </header>
  );
};

export default Header;
