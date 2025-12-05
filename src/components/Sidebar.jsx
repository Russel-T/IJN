import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiList,
  FiBriefcase,
  FiShoppingBag,
  FiLogOut,
} from "react-icons/fi";
import { UserAuth } from "../context/AuthContext";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: <FiHome size={20} />, to: "/dashboard" },
    { label: "Receipts", icon: <FiList size={20} />, to: "/receipts" },
    { label: "Materials", icon: <FiBriefcase size={20} />, to: "/materials" },
    {
      label: "Vendor Directory",
      icon: <FiShoppingBag size={20} />,
      to: "/vendors",
    },
  ];

  const { session, signOut } = UserAuth();
  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.log("Error signing out:", error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-white text-black transition-all duration-300 
        ${open ? "w-64" : "w-20"} flex flex-col`}
      >
        <div className="flex items-center justify-between p-4">
          <h1 className={`${open ? "text-xl font-bold" : "hidden"}`}>Matriq</h1>
          <FiMenu
            size={24}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>

        {/* Menu */}
        <nav className="mt-6 flex flex-col flex-1">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.to}>
              <SidebarItem
                icon={item.icon}
                label={item.label}
                open={open}
                active={location.pathname === item.to}
              />
            </Link>
          ))}

          {/* Sign Out at bottom */}
          <SidebarItem
            icon={<FiLogOut size={20} />}
            label="Sign Out"
            className="mt-auto"
            open={open}
            onClick={handleSignOut}
          />
        </nav>
      </div>

      {/* Render child pages here */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, open, active, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 p-3 cursor-pointer transition-all 
        ${active ? "bg-[#EFBC9B] font-semibold" : "hover:bg-[#EFBC9B]"} 
        ${className}
      `}
    >
      {icon}
      <span className={`${open ? "block" : "hidden"} text-sm`}>{label}</span>
    </div>
  );
}
