# NeMo – Next-Gen AI Creative Studio

NeMo is a powerful, AI-first video and audio editing platform designed to streamline the creative process. Built with Next.js and powered by Genkit, NeMo acts as your intelligent creative partner, handling everything from stylistic suggestions to complex media processing.

## ✨ Features

- **AI Editing Assistant**: Describe your vision in natural language (e.g., "Make it look cinematic" or "Add a 90s vlog feel"), and NeMo suggests the perfect effects, transitions, and assets.
- **Automated Media Analysis**: 
  - **Video**: Intelligent scene detection and frame-by-frame analysis.
  - **Audio**: High-fidelity speech-to-text transcription.
- **Smart Subtitles**: Automatically generate and time-sync subtitles for your video clips with one click.
- **Magic Enhancements**: 
  - **Video**: AI-powered background removal.
  - **Audio**: Professional-grade noise reduction and voice boosting.
- **Modern Timeline**: A responsive, intuitive editing interface with drag-and-drop support.
- **Template Library**: curated starting points for TikTok, YouTube, and professional ads.

## 🚀 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **AI Orchestration**: [Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Database & Auth**: [Firebase](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or later
- A Google Cloud Project with Gemini API access (for Genkit features)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in a `.env` file:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:9002](http://localhost:9002) in your browser.

## 📁 Project Structure

- `src/app`: Next.js pages and layouts.
- `src/ai/flows`: Genkit AI logic and prompt definitions.
- `src/components`: Reusable UI components (Dashboard, Editor, Layout).
- `src/firebase`: Firebase configuration and hooks.
- `src/lib`: Utility functions and placeholder data.

## 🧪 AI Development

To explore or debug the Genkit AI flows, you can use the Genkit UI:

```bash
npm run genkit:dev
```

---

Built with ❤️ for creators everywhere.