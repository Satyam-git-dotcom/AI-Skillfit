# AI SkillFit - Smart Video Assessments

AI SkillFit is a scalable, mobile-first AI video assessment platform designed specifically for the blue-collar and polytechnic workforce. It streamlines the hiring process by providing an accessible, multi-lingual interview interface for candidates, paired with a powerful admin dashboard for recruiters.

## Features

- 📱 **Mobile-First Candidate Portal**: A smooth, guided interview process designed for mobile devices.
- 🌐 **Multi-Lingual Support**: Supports interviews in English, Hindi, and Kannada.
- 📊 **Admin Dashboard**: Comprehensive metrics and data tables to evaluate candidates by skill, district, and fitment category.
- ✨ **Modern UI/UX**: Fluid page transitions, glassmorphism design, and micro-animations built with Framer Motion.
- 🧑‍💻 **Detailed Reports**: Admins can view individual candidate reports, complete with AI-generated feedback and scoring.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** CSS Modules, Modern CSS Features (Glassmorphism, Gradients)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/Satyam-git-dotcom/AI-Skillfit.git
cd AI-Skillfit
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx`: The main landing page.
- `src/app/candidate/`: Candidate interview portal pages.
- `src/app/admin/`: Admin dashboard and candidate report pages.
- `src/app/globals.css`: Global styles, CSS variables, and design system tokens.
- `src/lib/mockData.ts`: Mock data used for demonstrating the UI without a backend.

## Roadmap & Future Enhancements

- **Backend Integration**: Connect to a live database to store candidates and their interview results.
- **Real AI/Video Processing**: Implement actual camera recording and real-time AI analysis instead of the simulated UI flow.
- **Authentication**: Add login/signup functionality for administrators and candidates.
