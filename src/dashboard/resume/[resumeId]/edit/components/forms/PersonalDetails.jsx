import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";

function PersonalDetails() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get Started</p>
    </div>
  );
}

export default PersonalDetails;
