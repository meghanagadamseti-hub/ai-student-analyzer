import { FaCloudUploadAlt } from "react-icons/fa";

function ResumeUpload() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        📄 Upload Resume
      </h2>

      <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-10 text-center hover:border-indigo-500 transition">

        <FaCloudUploadAlt
          size={60}
          className="mx-auto text-indigo-600 mb-4"
        />

        <h3 className="text-lg font-semibold text-gray-700">
          Drag & Drop Resume
        </h3>

        <p className="text-gray-500 mt-2">
          or click below to browse
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          id="resumeUpload"
        />

        <label
          htmlFor="resumeUpload"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer transition"
        >
          Browse Resume
        </label>

        <p className="text-sm text-gray-400 mt-4">
          Supported formats: PDF, DOC, DOCX
        </p>

      </div>

    </div>
  );
}

export default ResumeUpload;