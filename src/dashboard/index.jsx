import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

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
      className="p-8 md:px-20 lg:px-32 min-h-screen flex flex-col items-center"
      style={{
        background:
          "radial-gradient(circle at top left, #f3e8ff, #fdfbfb, #ebf4ff, #fff)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <header className="text-center mt-12 mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Craft Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Resume
          </span>{" "}
          with Ease
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-xl mx-auto">
          Stunning templates. Smart suggestions. Instant results.
        </p>
      </header>

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full">
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
