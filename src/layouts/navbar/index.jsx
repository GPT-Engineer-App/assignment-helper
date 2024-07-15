import { navItems } from "@/nav-items";
import { Outlet } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";
import { MobileSheet } from "./_components/MobileSheet";
import { useContext } from "react";
import { SensoryPreferencesContext } from "@/contexts/SensoryPreferencesContext";

const Layout = () => {
  const { preferences } = useContext(SensoryPreferencesContext);

  const getBackgroundClass = () => {
    switch (preferences.background) {
      case 'nature':
        return 'bg-green-100';
      case 'abstract':
        return 'bg-blue-100';
      case 'minimal':
        return 'bg-gray-100';
      default:
        return 'bg-background';
    }
  };

  const getLayoutClass = () => {
    switch (preferences.layout) {
      case 'compact':
        return 'max-w-3xl mx-auto';
      case 'spacious':
        return 'max-w-5xl mx-auto px-8';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
      default:
        return '';
    }
  };

  return (
    <div className={`flex min-h-screen w-full flex-col ${getBackgroundClass()} ${preferences.font}`}>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <DesktopNavbar navItems={navItems} />
        <MobileSheet navItems={navItems} />
      </header>
      <main className={`flex-grow overflow-auto ${getLayoutClass()}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;