import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex bg-[#F5F7FB] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your AI Student Performance Dashboard.
        </p>

      </main>

    </div>
  );
}

export default Dashboard;