<<<<<<< HEAD
# A.V.I.S - AI Assistant Chatbot

A.V.I.S (Advanced Virtual Intelligence System) is a modern AI assistant chatbot with a sleek React frontend and Spring Boot backend. It uses the Gemini API to provide intelligent responses to user queries.

## Features

- 🤖 AI-powered chatbot using Google's Gemini API
- 🎨 Modern, responsive UI with light/dark theme support
- 🔒 Secure API key authentication
- 🎤 Voice input support (on compatible browsers)
- 💬 Markdown support in messages
- ⚡ Real-time chat interface

## Prerequisites

- Java 21
- Node.js and npm
- Gemini API key

## Setup

### Backend Setup

1. Make sure you have Java 21 installed
2. Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
   GEMINI_API_KEY=your_gemini_api_key
   ```
3. Build the Spring Boot application:
   ```
   ./mvnw clean install
   ```
4. Run the Spring Boot application:
   ```
   ./mvnw spring-boot:run
   ```
   The backend will start on http://localhost:8080

### Frontend Setup

1. Install the required npm packages:
   ```
   npm install
   ```
2. Start the React development server:
   ```
   npm start
   ```
   The frontend will start on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Enter your Gemini API key when prompted
3. Start chatting with A.V.I.S!

## Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/           # Java backend code
│   │   └── resources/      # Backend resources
│   ├── components/         # React components
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   ├── App.js              # Main React component
│   └── index.js            # React entry point
├── public/                 # Static assets
├── pom.xml                 # Maven configuration
└── package.json            # npm configuration
```

## API Endpoints

- `POST /api/chat` - Send a message to the chatbot
  - Requires Authorization header with Bearer token
  - Request body: `{ "message": "Your message here" }`
  - Response: `{ "response": "Bot response here" }`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This projet is belongs to Arjun Rajawat.
=======
# chatbot-avis
>>>>>>> 15cc7ebf0073c2feb6787eab10381726ae1d5cf8
