import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";
import GlobalApi from "./../../../../../../../service/GlobalApi";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

function Skills() {
  const [skillList, setSkillList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  useEffect(() => {
    resumeInfo && setSkillList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillList.slice();
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillList([
      ...skillList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const RemoveSkills = () => {
    setSkillList((skillList) => skillList.slice(0, -1));
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Skills updated successfully");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, please try again later");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillList,
    });
  }, [skillList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your top Skills</p>
      <div>
        {skillList.map((item, index) => (
          <div className="flex justify-between  border rounded-l-lg p-3 mb-2 mt-2">
            <div>
              <label className="text-xs">Skill Name</label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
                defaultValue={item?.name}
              />
            </div>

            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
              defaultValue={item?.rating}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-primary border-primary"
            onClick={AddNewSkills}
          >
            Add Skills
          </Button>
          <Button
            variant="outline"
            className="text-primary border-primary"
            onClick={RemoveSkills}
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

export default Skills;
