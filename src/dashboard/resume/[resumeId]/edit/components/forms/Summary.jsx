import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { AIChatSession } from "./../../../../../../../service/AIModel";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState();
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const prompt =
    "Job Title: {jobTitle} , Depend  on  job title give me a summary for my resume within  4-5 lines in JSON format with field experience Level and Summary with Experience level for Fresher , Mid Level and Experienced. ";

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const parsed = JSON.parse(result.response.text());

      const normalized = parsed.map((item) => ({
        experienceLevel:
          item.experienceLevel ||
          item.ExperienceLevel ||
          item.experience_level ||
          item.experienceLevels ||
          "",
        summary: item.summary || item.Summary || item.SUMMARY || "",
      }));

      setAiGeneratedSummaryList(normalized);
    } catch (err) {
      toast.error("⚠️ Failed to parse AI response. Please try again.");
    }

    setLoading(false);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary,
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        enabledNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      (error) => {
        setLoading(false);
        toast.error("⚠️ Failed to save summary.");
      }
    );
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary Details</h2>
        <p>Add Summary for your Job Title</p>

        <form onSubmit={onSave} className="mt-7">
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                GenerateSummaryFromAI();
              }}
              disabled={loading}
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            placeholder="Write a summary about your work experience, skills, and achievements."
            onChange={(e) => setSummary(e.target.value)}
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg mt-6">Suggestions</h2>
          {aiGeneratedSummaryList?.map((item, index) => (
            <div key={index}>
              <h2 className="font-bold my-1">Level: {item?.experienceLevel}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
