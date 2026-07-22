import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
function ResumeUpload({
    setResumeData,
    setAnalysisComplete
}) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const uploadResume = async () => {

  if (!file) {
    setMessage("Please select a resume first.");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);

  try {

    const response = await fetch("http://127.0.0.1:5000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

console.log("Backend Response:", data);
console.log("setResumeData =", setResumeData);

setResumeData({
    uploaded: true,
    filename: data.filename
});

setAnalysisComplete(false);
console.log("After setResumeData");
setMessage(data.message || "Resume uploaded successfully");
  } 
  catch (error) {
      console.error("Upload Error:", error);

    setMessage("Upload failed.");

  }
};
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
           onChange={(e) => setFile(e.target.files[0])}
/>

       <label
  htmlFor="resumeUpload"
  className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl cursor-pointer transition"
>
  Browse Resume
</label>

<button
  onClick={uploadResume}
  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full"
>
  Upload Resume
</button>

{message && (
  <p className="mt-4 text-center text-green-600 font-medium">
    {message}
  </p>
)}

<p className="text-sm text-gray-400 mt-4">
  Supported formats: PDF, DOC, DOCX
</p>

      </div>

    </div>
  );
}

export default ResumeUpload;