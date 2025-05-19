import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor({ isParsedResume = false, selectedColor, onColorChange }) {
  const colors = [
    "#E91E63",
    "#5C6BC0",
    "#4CAF50",
    "#9C27B0",
    "#9E9E9E",
    "#F06292",
    "#2196F3",
    "#66BB6A",
    "#BA68C8",
    "#757575",
    "#C2185B",
    "#1E88E5",
    "#2E7D32",
    "#AB47BC",
    "#616161",
    "#B71C1C",
    "#0D47A1",
    "#1B5E20",
    "#8E24AA",
    "#424242",
    "#880E4F",
    "#1565C0",
    "#00695C",
    "#6A1B9A",
    "#000000",
  ];

  const resumeContext = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const [localColor, setLocalColor] = useState(selectedColor || "#E91E63");

  const isInEditor = !!resumeContext;

  const onColorSelect = (color) => {
    if (isInEditor) {
      resumeContext.setResumeInfo({
        ...resumeContext.resumeInfo,
        themeColor: color,
      });

      GlobalApi.UpdateResumeDetail(resumeId, {
        data: { themeColor: color },
      }).then(
        () => toast("Theme Color Updated!"),
        () => toast("Could not update color.")
      );
    } else {
      setLocalColor(color);
      onColorChange?.(color);
    }
  };

  // Auto-set black for parsed resumes (in edit view only)
  useEffect(() => {
    if (
      isParsedResume &&
      isInEditor &&
      resumeContext?.resumeInfo?.themeColor !== "#000000"
    ) {
      onColorSelect("#000000");
    }
  }, [isParsedResume]);

  if (isParsedResume && !onColorChange) return null; // hide in parsed mode in editor

  const activeColor = isInEditor
    ? resumeContext?.resumeInfo?.themeColor
    : localColor;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-3 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                activeColor === item ? "border-black" : ""
              }`}
              style={{ background: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
