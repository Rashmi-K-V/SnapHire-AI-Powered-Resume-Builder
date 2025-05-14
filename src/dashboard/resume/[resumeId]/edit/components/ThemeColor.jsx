import React, { useContext, useState } from "react";
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

function ThemeColor() {
  const colors = [
    "#E91E63",
    "#5C6BC0",
    "#4CAF50",
    "#FFC107",
    "#9E9E9E",
    "#F44336",
    "#2196F3",
    "#43A047",
    "#FF9800",
    "#757575",
    "#C2185B",
    "#1E88E5",
    "#2E7D32",
    "#FF5722",
    "#616161",
    "#B71C1C",
    "#0D47A1",
    "#1B5E20",
    "#FB8C00",
    "#424242",
    "#880E4F",
    "#1565C0",
    "#00695C",
    "#EF6C00",
    "#000000",
  ];
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();

  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        toast("Theme Color Added Successfully!");
      },
      (error) => {
        toast("Couldn't save Please try Again later!");
      }
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 ">
          <LayoutGrid />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-3 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-4">
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
                selectedColor == item && "border border-black"
              }`}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
