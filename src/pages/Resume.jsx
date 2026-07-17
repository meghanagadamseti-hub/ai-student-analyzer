import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ResumeUploadCard from "../components/ResumeUploadCard";

function Resume() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

         <main className="ml-72 flex-1 p-8">
            <Navbar />

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Resume Management
          </h1>

          <p className="text-gray-500 mt-2">
            Upload and manage your resume for AI-powered analysis.
          </p>
        </div>

        <ResumeUploadCard />
      </main>
    </div>
  );
}

export default Resume;