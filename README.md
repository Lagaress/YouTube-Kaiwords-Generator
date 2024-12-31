# YouTube K(AI)words Generator

A Next.js application that leverages AI to generate optimized keywords for YouTube videos. This tool helps content creators maximize their video's SEO potential by generating relevant keywords in multiple languages.

## 🌟 Features

- 🤖 AI-powered keyword generation
- 🌍 Multi-language support (English, Spanish)
- ✨ Real-time character count
- 📋 One-click copy functionality
- 🔔 Toast notifications
- 🎨 Clean, responsive UI with Tailwind CSS
- 🚀 Built with Next.js 15 and TypeScript

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** Geist (Sans & Mono)
- **AI Integration:** OpenAI GPT-4
- **Development Tools:** ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/youtube-kaiwords-generator.git
cd youtube-kaiwords-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

1. Enter your video description in the text area (max 240 characters)
2. Select your target language using the flag icon
3. Click "Generate" to create optimized keywords
4. Copy individual keywords by clicking on them or use "Copy All"
5. Keywords are automatically optimized for YouTube's SEO requirements

## 🔑 Environment Variables

The following environment variables are required:

- `OPENAI_API_KEY`: Your OpenAI API key for keyword generation

## 📦 Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/         # React components
├── contexts/          # React contexts
├── config/            # Configuration files
```

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ✨ Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [OpenAI](https://openai.com/) and [Cursor](https://www.cursor.com/)
