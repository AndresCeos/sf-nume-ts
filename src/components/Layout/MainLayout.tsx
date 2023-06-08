import Navbar from './Navbar';
import Sidebar from './Sidebar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar />
        <section className="app-content">
          {children}
        </section>
      </div>
    </>
  );
}

export default MainLayout;
