import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  // Format platform-specific display name from URL
  const getPlatformDisplay = (url, platform) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);
      const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);

      if (platform === "linkedin" && pathSegments.includes("in")) {
        const index = pathSegments.indexOf("in");
        return `linkedin/${pathSegments[index + 1] || ""}`;
      }

      if (platform === "github") {
        return `github/${pathSegments[0] || ""}`;
      }

      return `${platform}/${pathSegments.join("/")}`;
    } catch (e) {
      return url;
    }
  };

  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h2 className="text-center text-sm font-medium">
        {resumeInfo?.jobTitle}
      </h2>
      <h2
        className="font-normal text-xs text-center mb-4"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between gap-1 flex-wrap text-center text-xs">
        <h2 style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.phone}</h2>
        <h2 style={{ color: resumeInfo?.themeColor }}>{resumeInfo?.email}</h2>

        {resumeInfo?.githubURL && (
          <a
            href={resumeInfo.githubURL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: resumeInfo?.themeColor }}
          >
            {getPlatformDisplay(resumeInfo.githubURL, "github")}
          </a>
        )}

        {resumeInfo?.linkedinURL && (
          <a
            href={resumeInfo.linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: resumeInfo?.themeColor }}
          >
            {getPlatformDisplay(resumeInfo.linkedinURL, "linkedin")}
          </a>
        )}
      </div>

      <hr
        className="border-[1px] my-2"
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
