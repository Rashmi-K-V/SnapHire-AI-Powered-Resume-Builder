import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert(": Please select a file first");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:1337/api/extract",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedData = res.data;

      // Save extracted data to localStorage or state manager
      localStorage.setItem("extractedResume", JSON.stringify(extractedData));

      // Redirect to resume editor
      navigate("/resume-template");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block"
      />

      <Button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Extract and Continue"}
      </Button>
    </div>
  );
}

export default UploadResume;
