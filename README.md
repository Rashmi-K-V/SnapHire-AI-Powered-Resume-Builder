# 🚀 SnapHire – AI-Powered Resume Builder

**SnapHire** is your intelligent career companion — an AI-driven resume builder designed to simplify, beautify, and empower your job application process. With a dynamic dashboard, real-time customization, and powerful AI tools, SnapHire transforms resume building into a delightful experience.

---

## 🧩 Key Features

- **📁 Unified Dashboard**  
  Manage all your resumes in one place. Revisit, duplicate, or edit them with ease.

- **🧱 Interactive Resume Builder**  
  Step-by-step form to input your personal details, skills, experience, and education — with live visual updates.

- **🎨 Live Theme Customization**  
  Manually created resumes can be styled using elegant color palettes in real time.

- **🤖 AI Summary Generator**  
  Enter your job title or key skills, and let the **Google Gemini API** generate a professional, ATS-optimized summary.

- **📤 Resume Upload & Parsing (.docx only)**  
  Upload an existing resume in **Microsoft Word (.docx)** format. SnapHire uses **Google Gemini** to intelligently parse its content and convert it into SnapHire’s structured, editable format.  
  ⚠️ **Parsed resumes are assigned a default black theme and cannot be customized.**

- **📥 Download as PDF**  
  Export a professionally styled, ATS-friendly resume with one click.

- **🔐 Secure Authentication**  
  Powered by **Clerk** to ensure your data remains secure and private.

---

## ⚙️ Tech Stack

| Layer    | Technology            |
| -------- | --------------------- |
| Frontend | React, Tailwind CSS   |
| Auth     | Clerk                 |
| Backend  | Strapi (Headless CMS) |
| Database | Supabase              |
| AI       | Google Gemini API     |

---

## 📂 Resume Upload & Parsing

Easily import your existing resume into SnapHire:

- Supported format: `.docx` (Microsoft Word only)
- Parsing handled by **Google Gemini API**
- Extracted fields include name, email, phone, skills, education, experience, and summary
- Auto-filled into SnapHire’s interface
- **Theme color is fixed to black** for parsed resumes

This feature helps you quickly transform your existing resume into a polished, editable SnapHire format with minimal manual input.

---

<!-- ## 📸 Preview

| Dashboard | Resume Builder |
|----------|----------------|
| ![Dashboard](link-to-image) | ![Builder](link-to-image) |

--- -->

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/snaphire-ai-resume-builder.git
cd snaphire-ai-resume-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3.Set Up Environment Variables

Create a .env file:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4.Run Server

For Website

```bash
npm run dev
```

For Backend(Strapi)

```bash
npm run develop
```
