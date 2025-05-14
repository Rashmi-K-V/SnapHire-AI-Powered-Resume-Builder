import { Notebook , Pen} from "lucide-react";
import { MoreVertical } from "lucide-react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function ResumeCardItem({ resume }) {

  const navigation = useNavigate();
  // const onMenuClick = (url) =>{
    // navigation(url);
  // } 

  return (
    <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
      <div>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 flex items-center justify-center h-[230px] border-t-4 rounded-t-lg hover:scale-105 transition-all hover:shadow-md shadow-primary"
          style={{ borderColor: resume?.themeColor ||  "#EF4444" }}
        >
          <Notebook className="bg-yellow-400 rounded-lg  size-8" />
         
        </div>
       <div
  className="flex items-center justify-between px-3 py-2 rounded-b-md"
  style={{
    background: resume?.themeColor || "#EF4444", 
  }}
>
  <h2 className="text-xs font-medium text-white hover:scale-105">
    {resume.title}
  </h2>
  
  <DropdownMenu>
    <DropdownMenuTrigger>
      <MoreVertical className="h-4 w-4 text-white cursor-pointer" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={()=>navigation("/dashboard/resume/" + resume.documentId + "/edit")} >Edit</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>navigation("/my-resume/" + resume.documentId + "/view")}
      >View</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>navigation("/my-resume/" + resume.documentId + "/view")}>Download</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

</div>
    </div>
    </Link>
    
  );
}

export default ResumeCardItem;
