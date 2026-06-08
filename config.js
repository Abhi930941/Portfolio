// ============================================
// PORTFOLIO CONFIGURATION 
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
    flask: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
    excel: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg',
    word: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg',
    postgresql: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg',
    tally: 'https://companieslogo.com/img/orig/TALLY.NS-7d494922.png',
    tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
  },
  
  // ==================== CERTIFICATE IMAGES ====================
   CERTIFICATES: {
  fullstack: [
    'images/certificates/fullstack-novitech.jpg',
    'images/certificates/fullstack-pantech.jpg'
  ],
  powerbi: [
    'images/certificates/powerbi-novitech.jpg',
    'images/certificates/powerbi-micro-satish.jpg'
  ],
  3: 'images/certificates/data-analytics-novitech.jpg',
  6: 'images/certificates/sql-satish.jpg',
  8: 'images/certificates/excel-satish.jpg',
  9: 'images/certificates/tally-sharp.jpg',
  10: 'images/certificates/internship-novitech.jpg',

  ai: [
    'images/certificates/ai-pantech.jpg',
    'images/certificates/ai-novitech.jpg',
    'images/certificates/genai-pantech.jpeg'
  ],

  python: [
    'images/certificates/python-beginners-simplilearn.jpeg',
    'images/certificates/python-advanced-simplilearn.jpeg'
  ],

  others: [
    'images/certificates/data-analytics-novitech.jpg',
    'images/certificates/powerbi-micro-satish.jpg',
    'images/certificates/powerbi-novitech.jpg',
    'images/certificates/excel-satish.jpg',
    'images/certificates/tally-sharp.jpg',
    'images/certificates/chatgpt-juno.jpeg'
  ]
},
  
  // ==================== PROJECT IMAGES & DETAILED INFO ====================
  PROJECTS: {
    1: {
      thumbnail: 'images/projects/sangam-music.jpg',
      title: 'Sangam Music',
      description: 'Full-stack music streaming app that searches YouTube & Spotify for Indian songs with mood-based recommendations. One interface, two platforms.',
      tech: ['HTML5', 'CSS3','Javascript', 'Python+Flask','YouTube Data API', 'Spotify API'],
      liveUrl: 'https://abhi930941.github.io/Sangam-music-web/',

      overview: 'Music enthusiasts often struggle to find curated Indian music across different platforms, as most services lack mood-based recommendations for Bollywood and regional songs. Sangam solves this by bringing music into one unified platform with personalized, mood-based discovery and a simple, intuitive interface.',
      
      features: [
        'Real-time search across YouTube and Spotify with instant results',
        'Mood-Based Discovery with 8 curated categories (Happy, Sad, Romantic, Motivation, Party, Chill, Devotional, Classical)',
        'Embedded Playback with Built-in music player with controls',
        'Smart Search with Auto-suggestions and keyboard shortcuts (1-8 for moods)',
        'Integration with Spotify API for music metadata',
        'YouTube API integration for video playback'
      ],
      
      userGuide: [
        'Visit the platform and Click on the “Start Listening” button.',
        'Choose your mood or search for an artist.',
        'Click on any song to start playing instantly.',
        'Choose YouTube, Embed option to listen.',
        'Use the Stop and Volume controls as needed.',
        'Enjoy the music.'
      ],
      
      whyMatters: 'This platform allows users to enjoy Indian music in one place without switching between YouTube and Spotify, using mood-based organization and smart API integration, while also showcasing full-stack development skills through a Flask backend, API integrations, and modern frontend design to create a seamless music streaming experience.'
    },
    
    2: {
      thumbnail: 'images/projects/question-generator.jpg',
      title: 'Intelligent Question Generator',
      description: 'A Flask-based intelligent question generator that extracts content from PDFs or Wikipedia to automatically create quiz questions.',
      tech: ['Python','Flask', 'HTML5', 'CSS3', 'JavaScript','Bootstrap', 'NLP'],
      liveUrl: 'https://intelligent-question-generator.onrender.com',
      
      overview: 'Intelligent Question Generator that automatically generates quiz questions from uploaded PDFs or Wikipedia articles. Using Natural Language Processing (NLP), it extracts key information and creates meaningful questions for learning and assessment purposes.',
      
      features: [
        'Auto Question Generation',
        'Multi-Source Input - Supports 21 ML/AI topics + PDF upload',
        'Smart Options - Auto-generates plausible wrong answers',
        'Timed Quizzes - 10-minute timer with live progress tracking User Experience',
        'Secure Authentication - Password hashing & user sessions',
        'Visual Analytics with pie charts showing performance',
        'History Tracking',
      ],
      
      userGuide: [
        'Create account with username and password.',
        'Access personal dashboard.',
        'Choose from 21 pre-loaded ML/AI topics OR upload PDF.',
        'Read content section by section.',
        'Attempt 10-question timed quiz (10 minutes).',
        'View score, correct/incorrect breakdown.',
        'Check history page for past performance.'
      ],
      
      whyMatters: 'This project reduces quiz creation time for teachers, provides unlimited practice for students, offers a scalable solution for institutions, and demonstrates strong Python, NLP, and full-stack development skills by solving real educational problems.'
    },
    
    3: {
      thumbnail: 'images/projects/thumbnailpro.jpg',
      title: 'ThumbnailPro',
      description: 'A web-based tool that enables content creators to design professional YouTube thumbnails without requiring graphic design software or skills. Built to solve the common pain point of creating eye-catching thumbnails quickly and efficiently.',
      tech: ['Python','Flask', 'HTML5', 'CSS3','JavaScript', 'PIL'],
      liveUrl: 'https://youtube-thumbnail.onrender.com/',
      
      overview: 'YouTube creators need attractive thumbnails to increase video click-through rates, but professional design tools like Photoshop are expensive and have a steep learning curve. This application provides an accessible, browser-based alternative with real-time preview and customization options.',
      
      features: [
        'Dual Mode Editor allows users to choose between a simple form mode and an advanced canvas editor',
        'Live Preview shows the thumbnail in real time while the user is making changes',
        'Custom Styling lets users change fonts, colors, shadows, and other visual effects easily',
        'Image Upload allows users to add a background image and apply basic filters',
        'The tool includes 5 pre-designed templates in Simple Mode and 20 pre-designed templates in Advanced Mode',
        'Export in high-resolution (1280x720)',
      ],
      
      userGuide: [
        'Choose Simple or Advanced mode.',
        'Add title and subtitle text.',
        'Select colors and styles for text and backgound.',
        'Upload background image (optional).',
        'Click download - ready for YouTube.',
      ],
      
      whyMatters: 'This project demonstrates skills in Python PIL image processing and full-stack development by creating an easy-to-use tool that generates professional thumbnails without expensive software or design skills.'
    },
    
    4: {
      thumbnail: 'images/projects/weather-app.jpg',
      title: 'Weather Forecast Web-app',
      description: 'Real-time weather web application with location-based forecasts, interactive maps, weather predictions with hourly breakdowns.',
      tech: ['HTML5','CSS3','JavaScript', 'Weather API'],
      liveUrl: 'https://abhi930941.github.io/Whether-app/',
      
      overview: 'A responsive web application that delivers real-time weather information for cities worldwide. Users can search any city and instantly receive comprehensive weather data including temperature, humidity, wind conditions, and interactive location mapping.',
      
      features: [
        'Real-time Weather Data with Current temperature, humidity, wind speed, pressure, and visibility for any location',
        'Global City Coverage',
        'Visual location representation with custom markers',
        'Quick city suggestions and intuitive search functionality',
        'Interactive weather maps with layers'
      ],
      
      userGuide: [
        'Enter city name in search bar or click popular city tags.',
        'See temperature, condition, and detailed weather metrics.',
        'Explore map shows exact city location with marker'
      ],
      
      whyMatters: 'Traditional weather websites are often cluttered with advertisements and complicated interfaces. This application provides a clean, fast, and reliable solution for accessing weather information without distractions.'
    },
    
    5: {
      thumbnail: 'images/projects/voicetotext.jpg',
      title: 'VoicetoTextPro',
      description: 'VoicetoTextPro web application that converts voice into accurate text transcripts in real-time. Designed for professionals, students, and content creators who need fast, reliable transcription without manual typing.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Web Speech API'],
      liveUrl: 'https://abhi930941.github.io/VoiceTextPro/',
      
      overview: 'VoiceText Pro transforms spoken words into text instantly with 99% accuracy, supporting both Hindi and English languages. All processing happens locally in your browser—no data sent to external servers.',
      
      features: [
        'Real-time Voice Transcription',
        'Multi-language support (Hindi & English)',
        'Hands-free punctuation and formatting ("comma", "period", "new line")',
        'Support for multiple languages',
        'Voice commands for punctuation ("comma", "period")',
        'Live audio waveform visualization',
        'Download as TXT or PDF and One click copy to clipboard'
       ],
      
      userGuide: [
        'Open the application in your browser',
        'Navigate to the "Transcribe" section',
        'Select your preferred language (Hindi/English)',
        'Enable desired features (Noise Reduction, Auto-punctuation)',
        'Click "Start" and allow microphone access',
        'Begin speaking clearly'
      ],
      
      whyMatters: 'Manual typing is slow and error-prone. During meetings or lectures, you miss important points while taking notes. VoiceText Pro captures everything you say instantly and accurately.'
    },
    
    6: {
      thumbnail: 'images/projects/calcpro.jpg',
      title: 'CalcPro',
      description: 'A multi-functional web calculator that performs basic, scientific, BMI, interest, and age calculations through a simple and attractive interface.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      liveUrl: 'https://abhi930941.github.io/CalcPro/',
      
      overview: 'CalcPro solves the problem of scattered calculator tools by providing a unified platform with multiple specialized calculators in one place. It demonstrates professional frontend development skills with focus on user experience, responsive design, and mathematical accuracy.',
      
      features: [
        'Basic Calculator - Standard arithmetic operations with keyboard support',
        'Scientific Calculator - Trigonometry, logarithms, powers, factorials, constants (π, e)',
        'Age Calculator - Precise age in years, months, days with future date support',
        'BMI Calculator - Health metrics with visual scale and metric/imperial units',
        'Interest Calculator - Simple & compound interest with detailed breakdowns'
      ],
      
      userGuide: [
        'Choose your calculator from homepage or navigation menu.',
        'Basic/Scientific: Click buttons or type numbers, use operators, press = or Enter to calculate.',
        'Age: Select birth date, optionally set target date, click Calculate.',
        'BMI: Toggle units (Metric/Imperial), enter weight & height, click Calculate.',
        'Interest: Input principal, rate, time, select type (Simple/Compound), calculate.',
      ],
      
      whyMatters: 'CalcPro eliminates the need to switch between multiple calculator apps by offering professional-grade math, health, and finance calculations in one elegant interface while showcasing strong JavaScript, mathematical programming, and UI/UX design skills.'
    },
    
    7: {
      thumbnail: 'images/projects/easeshop.jpg',
      title: 'EaseShop Web',
      description: 'ShopEase Fashion is a fully responsive e-commerce web application designed for online fashion retail. It provides a seamless shopping experience with features like product browsing, cart management, checkout process, and order confirmation.',
      tech: ['HTML5', 'CSS3', 'JavaScript','Bootstrap'],
      liveUrl: 'https://abhi930941.github.io/Ecommerce-Web/',
      
      overview: 'EaseShop is a modern e-commerce platform designed for fashion and lifestyle products. It features a complete shopping experience with product browsing, cart management, and checkout process, all built with JavaScript and responsive design.',
      
      features: [
        'Browse fashion products across multiple categories',
        'Filter by category, price range, size, and color',
        'Real-time product search with keyword matching',
        'Add/remove items, update quantities, view cart summary',
        'Complete order form with validation',
        'Order tracking and confirmation page'
      ],
      
      userGuide: [
        'The user browses products from the home or category page and clicks on a product to select.',
        'The user clicks “Add to Cart” or “Buy Now” to add the item to the cart.',
        'On the cart page, the user can increase/decrease the quantity or remove the item.',
        'At checkout, the user fills in shipping details and places the order, then receives confirmation.',
        'Adjust quantities or remove items as needed.',
        'Users can easily find products using the search bar, category filters, and sort options like Price, Rating, and Newest.'
      ],
      
      whyMatters: 'This project delivers strong business value by solving real online shopping needs, offering a scalable retail model, focusing on customer experience and conversions, and demonstrating complete real-world e-commerce development expertise.'
    },
    
    8: {
      thumbnail: 'images/projects/botanic.jpg',  
      title: 'Smart Botanical Assistant',
      description: 'Smart Botanical Assistant is a modern web application that enables users to identify plants, plan seasonal gardens, take educational quizzes, and support endangered species conservation while earning points and badges through an engaging reward system.',
      tech: ['React.js','Vite', 'Tailwind CSS','Trefle API','Wikipedia API'],  
      liveUrl: 'https://abhi930941.github.io/botanical-app/',
      
      overview: 'Smart Botanical Assistant is an interactive platform designed for plant enthusiasts, students, and conservation advocates. It provides AI-powered plant identification using the Trefle API, personalized garden planning tools, engaging quizzes, and real-time tracking of endangered species.',
      
      features: [
        'Users can search plant species with smart recognition and detailed information.',
        'Users can plan seasonal gardens with helpful planting tips.',
        'Users can take quiz and earn badges based on their score.',
        'Users can explore endangered plants and make protection pledges.',
        'The web app supports both light and attractive dark modes.'
      ],
      
      userGuide: [
        'Click on “Login” and create an account with a username and password.',
        'Use the navigation menu to explore different features of the web-app.',
        'Search for plants to view their details and related Wikipedia information.',
        'Select a season to add plants to your garden and earn points, or take a 10-question quiz to earn badges.',
        'Browse endangered species and make a protection pledge to earn extra points.'
      ],
      
      whyMatters: 'Combines education, planning, and conservation in one platform—addressing the gap between botanical knowledge and practical gardening while raising endangered species awareness.'
    },
    
    9: {
      thumbnail: 'images/projects/expencetracker.jpg',
      title: 'ExpenseFlow',
      description: 'A comprehensive web application for managing personal finances, tracking expenses, and visualizing spending patterns through interactive charts and analytics.',
      tech: ['React.js', 'Tailwind', 'Recharts'],
      liveUrl: 'https://abhi930941.github.io/expense-tracker/',
      
      overview: 'ExpenseTracker is a user-friendly web application designed to help people record their daily expenses, organize them into categories, and understand their spending habits through clear charts and data insights.',
      
      features: [
        'Secure login with separate user accounts',
        'Add, edit, and delete income and expenses',
        'View charts and real-time balance on dashboard',
        'Set budgets and track spending with alerts',
        'Multiple themes with dark and light mode'
      ],
      
      userGuide: [
        'Sign up with your name, email, and password, then log in to access the dashboard.',
        'Add your income and expenses by entering the details like amount, category, and date.',
        'Edit or delete any transaction from the expense history section.',
        'Set budgets for different categories and track your spending with progress bars and alerts.',
        'View charts and balance on the dashboard, and switch between dark and light mode anytime.'
      ],
      
      whyMatters: 'Many individuals struggle with financial awareness and budgeting. This application provides a simple, accessible solution to track daily expenses, understand spending habits, and make informed financial decisions without requiring complex accounting knowledge or expensive software.'
    },
    
    10: {
      thumbnail: 'images/projects/qr-hub.jpg',
      title: 'Smart QR Hub',
      description: 'A modern, full-featured QR code management platform with generation, scanning, and user authentication capabilities.',
      tech: ['React.js', 'Tailwind','qrcode.react','qr-scanner','Clerk Auth'],
      liveUrl: 'https://smart-qr-hub.vercel.app/',
      
      overview: 'Smart QR Hub is a full-stack web application that allows users to generate and scan multiple types of QR codes in one platform, with customization options, secure login, and personalized history tracking to solve the problem of using separate QR tools.',
      
      features: [
        'Create multiple types of QR codes like URL, WiFi, payment, and more',
        'Secure login with personal history tracking',
        'Download QR codes instantly',
        'Scan QR codes using image upload',
        'saved data and smooth performance.'
      ],
      
      userGuide: [
        'Select the QR type, enter the details, click “Generate” to download the QR.',
        'Go to the “Scan QR” tab and upload an image to scan a QR code.',
        'View the decoded result and copy the text if needed.',
        'Open the “History” tab to see all your generated QR codes.',
        'Delete individual history items or clear all records anytime.'
      ],
      
      whyMatters: 'This project provides an all-in-one QR solution with secure login, data saving, third-party integration, and real-world uses like payments, WiFi sharing, and digital business cards.'
    }
  }
}; 

// ==================== EXPORT ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}