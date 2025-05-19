import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/dashboard/resume/[resumeId]/edit/components/ResumePreview";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";
import { RWebShare } from "react-web-share";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 pb-10">
        <div id="no-print">
          <Header />

          {/* Congrats text */}
          <div className="text-center mt-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              🎉 Congratulations! Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600">
                AI-Resume
              </span>{" "}
              is Ready!
            </h2>
            <p className="text-gray-700 text-md mt-1.5">
              Download your resume or share it using a unique URL.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-6">
              <Button
                onClick={HandleDownload}
                className="bg-gradient-to-br from-indigo-500 to-blue-600 hover:scale-105 text-white font-medium px-6 py-2 rounded-full shadow"
              >
                ⬇️ Download PDF
              </Button>

              <RWebShare
                data={{
                  text: "Hello! Check out my resume created with AI.",
                  url: `${
                    import.meta.env.VITE_BASE_URL
                  }/my-resume/${resumeId}/view`,
                  title: `${resumeInfo?.firstName || ""} ${
                    resumeInfo?.lastName || ""
                  } Resume`,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button className="bg-gradient-to-br from-cyan-300 to-emerald-500 hover:scale-105 text-white font-medium px-6 py-2 rounded-full shadow">
                  🔗 Share Resume
                </Button>
              </RWebShare>
            </div>
          </div>
        </div>

        {/* Resume Preview */}
        <div id="print-area" className="mt-6 mx-auto px-2 flex justify-center">
          <div className="bg-white shadow-xl rounded-md p-6 w-full max-w-[794px] print:shadow-none print:p-0">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
