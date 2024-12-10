import NavBar from "./components/NavBar";
import VideosList from "./components/VideosList";

function Layout() {
  return (
    <div className="bg-blue-200 flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex">
        <div className="container mx-auto p-4 flex-grow">
          <div className="flex gap-4">
            <VideosList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
