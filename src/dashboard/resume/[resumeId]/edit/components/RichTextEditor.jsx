import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../../../service/AIModel";
import { toast } from "sonner";

const PROMPT = `I am writing a resume for the position of "{positionTitle}". Generate 4-5 professional experience bullet points for this role. Return the result ONLY as an HTML  Do not include any JSON, metadata, or explanation.`;

function RichTextEditor({ onRichTextEditorChange, index }) {
  const [value, setValue] = useState();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast("Please Add Position Title First");
      setLoading(false);
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    const result = await AIChatSession.sendMessage(prompt);

    // console.log(result.response.text());
    const resp = result.response.text();
    // setValue(resp.replace("[", "").replace("]", ""));

    const cleanedResponse = resp.replace("[", "").replace("]", "");

    // Ensure the response is a valid HTML string
    const htmlResponse = cleanedResponse.startsWith("<")
      ? cleanedResponse
      : `<p>${cleanedResponse}</p>`;

    setValue(htmlResponse);

    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          onClick={GenerateSummaryFromAI}
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-2 w-4" />
              Generate From AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnBulletList />
            <BtnNumberedList />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
