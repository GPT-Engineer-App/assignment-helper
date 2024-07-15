import { Package2 } from "lucide-react";
import { NavItem } from "./NavItem";
import { useContext } from "react";
import { SensoryPreferencesContext } from "@/contexts/SensoryPreferencesContext";

export const DesktopNavbar = ({ navItems }) => {
  const { preferences } = useContext(SensoryPreferencesContext);

  return (
    <nav className={`hidden md:flex md:items-center md:gap-5 lg:gap-6 text-lg font-medium md:text-sm ${preferences.font}`}>
      <NavItem
        to="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </NavItem>
      {navItems.map((item) => (
        <NavItem key={item.to} to={item.to}>
          {item.title}
        </NavItem>
      ))}
    </nav>
  );
};