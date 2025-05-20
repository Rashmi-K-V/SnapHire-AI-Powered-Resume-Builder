import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [resumeTitle, setResumeTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setOpenDialog(true);
  };

  const handleUpload = async () => {
    if (!file || !resumeTitle) return alert("File and title are required");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setIsUploading(true);
      const parseRes = await GlobalApi.UploadAndParseResumeFile(formData);
      const parsedData = parseRes.data?.parsed;

      if (!parsedData) throw new Error("Parsing failed");

      const uuid = uuidv4();
      const payload = {
        data: {
          title: resumeTitle,
          resumeId: uuid,
          themeColor: "#000000",
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
          firstName: parsedData?.firstName || "",
          lastName: parsedData?.lastName || "",
          address: parsedData?.address || "",
          jobTitle: parsedData?.jobTitle || "",
          phone: parsedData?.phone || "",
          email: parsedData?.email || "",
          githubURL: parsedData?.github || "",
          linkedinURL: parsedData?.linkedin || "",
          summary: parsedData?.summary || "",
          skills: (parsedData?.skills || []).map((skill) => ({
            name: skill,
            rating: 3,
          })),
          education: (parsedData?.education || []).map((edu) => ({
            universityName: edu.institution || "Unknown University",
            degree: edu.degree || "Unknown Degree",
            major: edu.major || "Undeclared Major",
            startDate: edu.startDate || "2016",
            endDate: edu.endDate || "2022",
          })),
          experience: (parsedData?.experience || []).map((exp) => ({
            title: exp.title || "Unknown Title",
            companyName: exp.company || "Unknown Company",
            city: exp.city || "Unknown City",
            state: exp.state || "Unknown State",
            startDate: exp.startDate || "2022",
            endDate: exp.endDate || "2023",
            workSummary: exp.description || "",
          })),
        },
      };

      const createRes = await GlobalApi.CreateNewResume(payload);
      const resumeId = createRes.data?.data?.id;
      if (!resumeId) throw new Error("Resume creation failed");

      // Pass parsedData to edit screen to prefill
      navigate("/dashboard", {
        state: { parsedData },
      });
    } catch (err) {
      console.error("Upload or creation failed:", err);
      alert("Upload or creation failed.");
    } finally {
      setIsUploading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div className="p-12 max-w-md mx-auto mt-20 bg-gradient-to-r from-violet-200 via-indigo-300 to-purple-300 rounded-3xl  text-[#FFFFFF] shadow-lg">
      <h2 className="text-4xl font-extrabold text-center mb-8 ">
        Upload Your Resume
      </h2>

      <label
        htmlFor="file-upload"
        className="block w-full cursor-pointer rounded-xl border-4 border-dashed border-white/50 bg-white/10 p-10 text-center hover:bg-white/20 transition duration-300 ease-in-out shadow-lg"
      >
        {file ? (
          <p className="text-white font-semibold text-lg">{file.name}</p>
        ) : (
          <p className="text-slate-600 text-md font-light select-none">
            Click here to select a Word document ONLY{" "}
          </p>
        )}
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      <p className="mt-6 text-center text-slate-600 text-sm select-none">
        Supported formats: <span className="font-semibold">.docx</span>
      </p>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your resume:
              <Input
                className="my-2"
                placeholder="e.g. Software Engineer Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
                value={resumeTitle}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5 mt-4">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!resumeTitle || isUploading}
              >
                {isUploading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadResume;
