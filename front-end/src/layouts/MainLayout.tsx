import { FC, ReactNode } from 'react';
import Header from './Header';
import SideBar from './SideBar';


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex bg-gray-100  ">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <main className="flex-1 space-y-6 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
