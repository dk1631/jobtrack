import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  return (
    <div className="app-layout">

      <Navbar />

      <div className="app-body">

        <Sidebar />

        <main className="main-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default MainLayout;