import '../FloatingLaura.css';
import FloatingLauraButton from '../FloatingLauraButton';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar />
        <section className="app-content bg-home-background">
          {children}
        </section>
      </div>
      <FloatingLauraButton />
    </>
  );
}

export default MainLayout;
