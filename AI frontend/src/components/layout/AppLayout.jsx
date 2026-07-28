import Sidebar from "../Sidebar";
import Navbar from "../Navbar";

/**
 * Standard authenticated page shell — Sidebar + Navbar + scrollable main.
 * Uses responsive left margin to match the fixed sidebar width.
 */
export default function AppLayout({ children, className = "" }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <main className={`ml-0 md:ml-64 flex-1 p-4 sm:p-6 min-w-0 ${className}`}>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
