# 🚀 SnapHire – AI-Powered Resume Builder

SnapHire is your intelligent career companion — an AI-driven resume builder designed to simplify, beautify, and empower your job application process. With a dynamic dashboard, real-time design customization, and powerful AI tools, SnapHire transforms resume building into a delightful experience.

---

## 🧩 Key Features

- **Unified Dashboard**  
  Keep track of all your resumes in one place. Revisit, duplicate, or edit with ease.

- **Interactive Resume Builder**  
  Step-by-step form to input your skills, experience, education, and more — with real-time updates.

- **Live Theme Customization**  
  Switch between elegant color palettes and see changes reflected instantly.

- **AI Summary Generator**  
  Just enter a job role or skills, and let the **Google Gemini API** write a compelling summary for you.

- **Download as PDF**  
  One click to download a beautifully formatted PDF — job-ready and ATS-friendly.

- **Secure Authentication**  
  Powered by **Clerk**, ensuring your resumes stay private and safe.

---

## ⚙️ Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | _React_, _Tailwind CSS_ |
| Auth     | _Clerk_                 |
| Backend  | _Strapi (Headless CMS)_ |
| Database | _Supabase_              |
| AI       | _Google Gemini API_     |

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
