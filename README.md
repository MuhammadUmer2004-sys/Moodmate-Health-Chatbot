# 🚀 MoodMate – AI-Powered Mood Calendar & Health Chatbot 🧠💬
MoodMate is a full-stack web application that fuses intelligent AI interactions with mood tracking and mental wellness features. Users can log their daily emotional state, receive health insights, and chat with an empathetic AI assistant — all in one secure, user-friendly platform.
## 🌟 Features

- 🧠 **AI Health Chatbot**: Context-aware chatbot to guide users through mood support, stress relief, and general wellness.
- 📅 **Mood Calendar**: Visual calendar for tracking daily moods and reflecting on mental patterns.
- 🔐 **User Authentication**: Secure sign-up and login using JWT.
- 📊 **Mood Analytics**: Graphs and trends based on user mood entries.
- 🧾 **Health Tips & Suggestions**: Personalized tips from AI based on recent mood logs.

## 🛠️ Tech Stack
### 🔹 Frontend
- React.js
- Axios
- Chart.js (or similar)
- Tailwind CSS / MUI (choose based on your project)

### 🔹 Backend
- Node.js
- Express.js
- OpenAI API (for chatbot)
- MongoDB (Mongoose ODM)
- JWT for Authentication
  
## 📁 Project Structure

MoodMate-Health-Chatbot/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.jsx
└── README.md

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/MuhammadUmer2004-sys/MoodMate-Health-Chatbot.git
cd MoodMate-Health-Chatbot

2. Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3. Set up environment variables
Create .env files for both frontend and backend with your MongoDB URI, OpenAI API key, and JWT secret.

Example for backend .env:

MONGO_URI=your_mongo_db_connection
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key

4. Run the project

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start

📄 License
MIT License © 2025 Muhammad Umer# 🚀 MoodMate – AI-Powered Mood Calendar & Health Chatbot 🧠💬



