import axios from "axios";

// Load API key from environment variables (if you’re using token-based auth)
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// Configure axios client with base URL and headers
const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`, // Only if Strapi API token is used
  },
});


const CreateNewResume = (data) =>
  axiosClient.post("/user-resumes", data);

const GetUserResumes = (userEmail) =>
  axiosClient.get(
    `/user-resumes?filters[userEmail][$eq]=${userEmail}&populate=*`
  );


const GetResumeById = (id) =>
  axiosClient.get(`/user-resumes/${id}?populate=*`);

// ✅ Update an existing resume by ID
const UpdateResumeDetail = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, data);

// ✅ Delete a resume by ID
const DeleteResumeById = (id) =>
  axiosClient.delete(`/user-resumes/${id}`);

// ✅ Upload + parse resume file (PDF/DOCX)
const UploadAndParseResumeFile = (formData) =>
  axiosClient.post("/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ✅ Export all API functions
export default {
  CreateNewResume,
  GetUserResumes,
  GetResumeById,
  UpdateResumeDetail,
  DeleteResumeById,
  UploadAndParseResumeFile,
};
