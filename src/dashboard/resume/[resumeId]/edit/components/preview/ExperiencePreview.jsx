import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName},{experience?.city},{experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>

          <ul className="text-xs list-disc ml-5">
            {experience?.workSummary
              ?.replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
              ?.split("\n") // Split by newlines (you may use `<li>` if your rich text returns HTML)
              ?.filter((line) => line.trim() !== "") // Remove empty lines
              ?.map((line, i) => (
                <li key={i}>{line.trim()}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
