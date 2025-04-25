import React from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

function FormSection() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" className="flex gap-2 ">
          <LayoutGrid />
          Theme
        </Button>
        <div>
          <Button className="flex gap-2" size="sm">
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Personal Details */}
      <PersonalDetails />
      {/* Summary */}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  );
}

export default FormSection;
