import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    user && GetResumeList();
  }, [user]);

  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };

  return (
    <div
      className="p-8 md:px-16 lg:px-24 min-h-screen flex flex-col items-center"
      style={{
        background:
          "radial-gradient(circle at top left, #f3e8ff, #fdfbfb, #ebf4ff, #fff)",
        fontFamily: " sans-serif",
      }}
    >
      <header className="w-full mb-9 flex justify-between items-start ">
        <div className="text-left">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Craft Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600">
              Resume
            </span>{" "}
            with Ease
          </h1>
          <p className="mt-4 text-gray-600 text-md max-w-xl">
            Stunning templates. Smart suggestions. Instant results.
          </p>
        </div>

        {/* Right-aligned Upload Resume button */}
        <Button
          variant="outline"
          className="mt-4 border-primary text-primary hover:bg-gradient-to-r from-purple-300 to-pink-300 hover:text-white"
          onClick={() => navigate("/upload-resume")}
        >
          📤 Upload Resume
        </Button>
      </header>

      <main className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem
              resume={resume}
              key={index}
              refreshData={GetResumeList}
            />
          ))}
      </main>
    </div>
  );
}

export default Dashboard;
