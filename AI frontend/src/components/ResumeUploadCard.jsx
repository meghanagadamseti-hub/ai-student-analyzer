import { FaCloudUploadAlt } from "react-icons/fa";

function ResumeUploadCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Upload Resume
      </h2>

      <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-12 flex flex-col items-center justify-center hover:border-indigo-500 transition duration-300">

        <FaCloudUploadAlt className="text-6xl text-indigo-600 mb-5" />

        <h3 className="text-xl font-semibold text-gray-800">
          Drag & Drop Resume Here
        </h3>

        <p className="text-gray-500 mt-2 text-center">
          Upload your resume in PDF, DOC or DOCX format
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Maximum File Size: 5 MB
        </p>

        <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition">
          Browse Files
        </button>
      </div>
    </div>
  );
}

export default ResumeUploadCard;