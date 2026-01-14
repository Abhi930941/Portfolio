// ============================================
// PORTFOLIO CONFIGURATION FILE
// ============================================

const CONFIG = {
  // ==================== RESUME CONFIGURATION ====================
  
  RESUME_PATH: 'resume/Resume.pdf',  
  RESUME_FILENAME: 'Abhishek_Sahani_Resume.pdf',  
  
  // ==================== EMAILJS CONFIGURATION ====================
  EMAILJS_SERVICE_ID: 'service_mcgodcc',
  EMAILJS_TEMPLATE_ID: 'template_cvozkw7',
  EMAILJS_PUBLIC_KEY: 'x7f8JzFcgTdblbK3Q',
  YOUR_EMAIL: 'abhishek242443@gmail.com',
  
  // ==================== PROFILE PHOTO ====================
  PROFILE_PHOTO: 'images/profile/profile.jpg',
  
  // ==================== SKILL LOGOS ====================
  SKILL_LOGOS: {
    cpp: 'https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.png',
    flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    excel: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg',
    word: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg',
    postgresql: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
    tally: 'https://companieslogo.com/img/orig/TALLY.NS-7d494922.png',
    tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
  },
  
  // ==================== CERTIFICATE IMAGES ====================
  CERTIFICATES: {
    1: 'images/certificates/fullstack-novitech.jpg',
    2: 'images/certificates/powerbi-novitech.jpg',
    3: 'images/certificates/data-analytics-novitech.jpg',
    4: 'images/certificates/fullstack-pantech.jpg',
    5: 'images/certificates/ai-pantech.jpg',
    6: 'images/certificates/sql-satish.jpg',
    7: 'images/certificates/powerbi-micro-satish.jpg',
    8: 'images/certificates/excel-satish.jpg',
    9: 'images/certificates/tally-sharp.jpg',
    10: 'images/certificates/internship-novitech.jpg'
  },
  
  // ==================== PROJECT IMAGES ====================
  PROJECTS: {
    1: {
      thumbnail: 'images/projects/sangam-music.jpg',
      title: 'Sangam Music',
      description: 'A dynamic web-based music platform that allows users to explore, play, and manage songs through an interactive frontend and Python Flask backend.',
      tech: ['HTML', 'CSS', 'Python+Flask', 'Spotify API'],
      liveUrl: 'https://sangam-music.onrender.com'
    },
    2: {
      thumbnail: 'images/projects/question-generator.jpg',
      title: 'Intelligent Question Generator',
      description: 'A Flask-based intelligent question generator that extracts content from PDFs or Wikipedia to automatically create quiz questions.',
      tech: ['Python', 'HTML5', 'CSS', 'JavaScript', 'NLP'],
      liveUrl: 'https://intelligent-question-generator.onrender.com'
    },
    3: {
      thumbnail: 'images/projects/thumbnailpro.jpg',
      title: 'ThumbnailPro',
      description: 'A web-based tool that allows users to create and customize YouTube thumbnails with dynamic text, fonts, colors, and image uploads.',
      tech: ['Python', 'HTML5', 'CSS', 'JavaScript', 'PIL'],
      liveUrl: 'https://youtube-thumbnail.onrender.com/'
    },
    4: {
      thumbnail: 'images/projects/weather-app.jpg',
      title: 'Weather Forecast App',
      description: 'Real-time weather application with location-based forecasts, interactive maps, weather predictions with hourly breakdowns.',
      tech: ['JavaScript', 'Weather API', 'CSS3', 'HTML5'],
      liveUrl: 'https://abhi930941.github.io/Whether-app/'
    },
    5: {
      thumbnail: 'images/projects/voicetotext.jpg',
      title: 'VoicetoTextPro',
      description: 'A web-based application that converts voice input into text and text into speech, providing seamless two-way interaction.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Web Speech API'],
      liveUrl: 'https://abhi930941.github.io/VoiceTextPro/'
    },
    6: {
      thumbnail: 'images/projects/calcpro.jpg',
      title: 'CalcPro',
      description: 'A multi-functional web calculator that performs basic, scientific, BMI, interest, and age calculations through a simple interface.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://abhi930941.github.io/CalcPro/'
    },
    7: {
      thumbnail: 'images/projects/easeshop.jpg',
      title: 'EaseShop Web',
      description: 'A fully responsive e-commerce website that allows users to browse, search, and purchase fashion and lifestyle products.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://abhi930941.github.io/Ecommerce-Web/'
    },
    8: {
    thumbnail: 'images/projects/botanic.jpg',  
    title: 'Smart Botanical Assistant',
    description: 'A React and Tailwind CSS–based Botanical App that displays plant-related information through a clean and user-friendly interface.',
    tech: ['React.js','Vite', 'Tailwind CSS'],  
    liveUrl: 'https://abhi930941.github.io/botanical-app/'  
  },
  9: {
    thumbnail: 'images/projects/expencetracker.jpg',
    title: 'ExpenseFlow',
    description: 'A simple Expense Tracker web app to manage income, expenses, budgets, and view financial reports.',
    tech: ['React.js', 'Tailwind', 'Recharts'],
    liveUrl: 'https://abhi930941.github.io/expense-tracker/'
  },
  10: {
    thumbnail: 'images/projects/qr-hub.jpg',
    title: 'Smart QR Hub',
    description: 'A React-based web application that allows users to generate and scan QR codes with a fast, secure, and user-friendly interface.',
    tech: ['React.js', 'Tailwind', 'Clerk Auth'],
    liveUrl: 'https://smart-qr-hub.vercel.app/'
  }
  }
}; 

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}