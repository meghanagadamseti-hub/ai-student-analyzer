import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloudUploadAlt, FaFileAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function ResumeUpload({ setResumeData, setAnalysisComplete }) {
  const [file, setFile]           = useState(null);
  const [message, setMessage]     = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadResume = async () => {
    if (!file) { setMessage("Please select a resume first."); setIsSuccess(false); return; }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await fetch("http://127.0.0.1:5000/upload", { method: "POST", body: formData });
      const data = await response.json();
      console.log("Backend Response:", data);
      setResumeData({ uploaded: true, filename: data.filename });
      setAnalysisComplete(false);
      setMessage(data.message || "Resume uploaded successfully");
      setIsSuccess(true);
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("Upload failed. Please try again.");
      setIsSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true);  };
  const handleDragLeave = ()  => setIsDragging(false);
  const handleDrop      = (e) => {
    e.preventDefault(); setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div className="theme-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(99,102,241,0.12)", color: "var(--color-indigo-text)" }}
        >
          <FaFileAlt className="text-sm" />
        </div>
        <div>
          <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            Upload Resume
          </h2>
          <p className="text-xs" style={{ color: "var(--text-faint)" }}>
            PDF, DOC, or DOCX — max 5 MB
          </p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="relative rounded-2xl p-8 text-center"
        style={{
          border:     `2px dashed ${isDragging ? "#6366f1" : "var(--border-input)"}`,
          background: isDragging ? "rgba(99,102,241,0.06)" : "var(--bg-elevated)",
          boxShadow:  isDragging ? "0 0 20px rgba(99,102,241,0.12)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <motion.div
          animate={{ y: isDragging ? -6 : 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex justify-center mb-4"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
              border:     "1px solid var(--border-input)",
            }}
          >
            <FaCloudUploadAlt className="text-3xl" style={{ color: "var(--color-indigo-text)" }} />
          </div>
        </motion.div>

        {file ? (
          <div>
            <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{file.name}</p>
            <p className="text-xs mt-1" style={{ color: "var(--text-faint)" }}>
              {(file.size / 1024).toFixed(1)} KB · Ready to upload
            </p>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-secondary)" }}>
              Drag &amp; Drop your resume here
            </p>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              or click below to browse files
            </p>
          </div>
        )}

        <input
          type="file" accept=".pdf,.doc,.docx"
          className="hidden" id="resumeUpload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          htmlFor="resumeUpload"
          className="inline-block mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:opacity-85 hover:-translate-y-0.5 transition-all"
          style={{
            background: "rgba(99,102,241,0.12)",
            border:     "1px solid var(--border-input)",
            color:      "var(--color-indigo-text)",
          }}
        >
          Browse Files
        </label>
      </div>

      {/* Upload button */}
      <button
        onClick={uploadResume}
        disabled={isUploading}
        className="mt-4 w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 hover:opacity-85 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        {isUploading ? (
          <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Uploading...</>
        ) : (
          <><FaCloudUploadAlt />Upload Resume</>
        )}
      </button>

      {/* Status message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
            style={{
              background: isSuccess ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.10)",
              border:     `1px solid ${isSuccess ? "rgba(16,185,129,0.28)" : "rgba(239,68,68,0.28)"}`,
              color:      isSuccess ? "var(--color-green-text)" : "var(--color-red-text)",
            }}
          >
            {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ResumeUpload;
