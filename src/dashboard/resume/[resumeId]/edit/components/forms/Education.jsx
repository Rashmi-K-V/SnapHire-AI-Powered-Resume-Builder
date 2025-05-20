import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationList, setEducationList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
    },
  ]);

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const RemoveEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
      },
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details Updated Successfully");
      },
      (error) => {
        setLoading(false);
        toast("Server Error,Please try again later");
      }
    );
  };

  useEffect(() => {
    if (resumeInfo?.education && Array.isArray(resumeInfo.education)) {
      setEducationList(resumeInfo.education);
    }
  }, [resumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Education Details</h2>
      <p>Add Educational Details</p>
      <div>
        {educationList &&
          educationList.map((item, index) => (
            <div>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.universityName}
                  />
                </div>
                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.degree}
                  />
                </div>
                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.major}
                  />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input
                    type="text"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <Input
                    type="text"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.endDate}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between items-center mt-5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary border-primary"
            onClick={AddNewEducation}
          >
            Add More Education
          </Button>
          <Button
            variant="outline"
            className="text-primary border-primary"
            onClick={RemoveEducation}
          >
            Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
