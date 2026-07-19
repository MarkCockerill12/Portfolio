import { PortfolioData } from "./types"

const BASE_URL = "https://pub-699441ce0cfb40449cc458823a3f1ed2.r2.dev/portfolio"

export const defaultPortfolioData: PortfolioData = {
  projects: [
    { 
      id: 20,
      title: "Omni-Convert",
      description: "A secure, high-performance client-side file conversion and media downloading toolkit.",
      media: {
        images: [`${BASE_URL}/media/Omni/omniconvert.WEBP`, `${BASE_URL}/media/Omni/omniconvert2.WEBP`],
      },
      github: "https://github.com/MarkCockerill12/OmniConverter",
      demo: "https://omniconverter.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FFmpeg.wasm", "Three.js", "Web Workers", "OPFS"],
      details: "A comprehensive, privacy-first conversion suite running entirely in the browser. It features multithreaded FFmpeg.wasm for media transcoding, an interactive audio editor with trimming and bitrate controls, headless 3D loaders and exporters (supporting GLB, GLTF, OBJ, STL), a binary parser for Wii/Nintendo models, and a secure media downloader using client-side salt-and-pepper SHA-256 password validation.",
      categories: ["Web"]
    },
    { 
      id: 19,
      title: "WikiRithim",
      description: "A website that showcases many algorithims",
      media: {
        images: [`${BASE_URL}/media/WikiRithim/WikiRithim.webp`],
      },
      github: "https://github.com/MarkCockerill12/WikiRithim",
      demo: "https://wiki-rithim.vercel.app/",
      technologies: ["Trunk", "Rust", "WASM"],
      details: "This website displays different types of algorithims and how they work. It includes Sorting, Searching, Linear, Trees, Graphs, Strings, Geometric and Maths algorithims.",
      categories: ["Web"]
    },
    { 
      id: 18,
      title: "Handwronging - Neural Handwriting OCR",
      description: "A specialized Optical Character Recognition engine featuring a custom Vision Transformer, honed through 13 iterations to decode complex cursive.",
      media: {
        images: [`${BASE_URL}/media/Handwronging/handwronging1.webp`, `${BASE_URL}/media/Handwronging/handwronging2.webp`],
      },
      huggingface: "https://huggingface.co/spaces/Hypernova823/Handwronging/tree/main/",
      demo: "https://hypernova823-handwronging.hf.space/",
      technologies: ["Python", "PyTorch", "Transformers", "Streamlit", "EasyOCR"],
      details: "This application utilizes a two-stage 'forensic' neural architecture. First, an EasyOCR computer vision engine performs mathematical line fusion to isolate horizontal text rows. Second, a TrOCR model (DeiT Vision Encoder + RoBERTa Language Decoder) translates the visual features into text. The engine features the 'V13 Specialist' model, the culmination of 13 rigorous training iterations, fine-tuning a base TrOCR architecture on the IAM Handwriting Database (>65,000 instances) alongside a heavily augmented synthetic data pipeline. The application allows users to directly compare this custom specialist against Microsoft's massive 1.3B parameter generalist model. While the Microsoft model excels at broad, generalized text, the V13 Specialist is explicitly engineered to outperform it in specific edge cases, mastering complex cursive loops and messy manual pen-strokes. The frontend is built in Streamlit, utilizing deep programmatic CSS overrides to achieve a flawless dark-mode UI, complete with real-time neural matrix loading bars, confidence score tracking, and Text-to-Speech (gTTS) audio playback. The entire pipeline is deployed on Hugging Face Spaces.",
      categories: ["AI", "Web", "Python"]
    },
    { 
      id: 17,
      title: "Agentic RAG System",
      description: "A high-performance Retrieval-Augmented Generation (RAG) web application engineered with Rust, HTMX, and Groq",
      media: {
        images: [`${BASE_URL}/media/RAG/rag1.webp`],
      },
      github: "https://github.com/MarkCockerill12/Honours",
      demo: "https://agentic-rag-n4wm.onrender.com/",
      technologies: ["Rust", "Axum", "SQLite", "HTMX", "Groq API", "HuggingFace Candle", "Tailwind CSS", "Docker"],
      details: "This system transforms local documents into an interactive knowledge base with autonomous agentic capabilities. It features dual-model resilience between Llama 3.3 and 3.1, private local embeddings using BERT, and an autonomous reasoning loop for precise document retrieval and synthesis. Optimized for performance with SQLite WAL mode and containerized for deployment on Render.",
      categories: ["Web", "AI", "Rust"]
    },
    { 
      id: 16,
      title: "DevOps- Conference Booking System",
      description: "A conference booking system with full DevOps implementation",
      media: {
        images: [`${BASE_URL}/media/DevOps/DevOps.webp`, `${BASE_URL}/media/DevOps/DevOps1.webp`, `${BASE_URL}/media/DevOps/DevOps2.webp`, `${BASE_URL}/media/DevOps/DevOps3.webp`, `${BASE_URL}/media/DevOps/DevOps4.webp`, `${BASE_URL}/media/DevOps/DevOps5.webp`, `${BASE_URL}/media/DevOps/DevOps6.webp`,  `${BASE_URL}/media/DevOps/DevOps7.webp`, `${BASE_URL}/media/DevOps/DevOps8.webp`, `${BASE_URL}/media/DevOps/DevOps9.webp`, `${BASE_URL}/media/DevOps/DevOps10.webp`, `${BASE_URL}/media/DevOps/DevOps11.webp`, `${BASE_URL}/media/DevOps/DevOps12.webp`, `${BASE_URL}/media/DevOps/DevOps13.webp`],
        video: `${BASE_URL}/media/DevOps/DevOps14.webm`,
      },
      github: "https://github.com/MarkCockerill12/Booking-System",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "AWS", "Vercel"],
      details: "This project was created to showcase different DevOps practices, such as CI/CD, Infrastructure as Code and Automated Testing. The conference booking system allows users to create accounts, book and manage their bookings for different conferences. The frontend is hosted on Vercel and the backend is hosted on AWS. It makes use of multiple different AWS services such as Lambda, API Gateway, DynamoDB and S3. ",
      categories: ["Web"]
    },
    { 
      id: 15,
      title: "Minecraft Book",
      description: "A simple website that acts like a book from minecraft",
      media: {
        images: [`${BASE_URL}/media/MCbook/MCbook.webp`],
      },
      github: "https://github.com/MarkCockerill12/MinecraftBook",
      demo: "https://minecraft-book.vercel.app/",
      technologies: ["React", "Typescript", "Vercel", "Next.js"],
      details: "This website acts like a book from minecraft, It allows you to edit and export text as pictures",
      categories: ["Web"]
    },
    { 
      id: 14,
      title: "LoFi Web",
      description: "A website that plays LoFi music with visuals to help with focus, studying and relaxation",
      media: {
        images: [`${BASE_URL}/media/Lofi/Lofi1.webp`, `${BASE_URL}/media/Lofi/Lofi2.webp`, `${BASE_URL}/media/Lofi/Lofi3.webp`, `${BASE_URL}/media/ChrisLofi/Lofi4.webp`, `${BASE_URL}/media/ChrisLofi/Lofi5.webp`],
      },
      github: "https://github.com/MarkCockerill12/LofiWeb",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Cloudflare R2", "Vercel"],
      demo: "https://lofiweb.vercel.app/",
      details: "This website was designed to help with studying and calming down. It displays a looping background with music, users can choose between different visuals, sound overlays, colours and songs to best fit their needs. The songs and videos are hosted on Cloudflare's R2 and the frontend is hosted on Vercel.",
      categories: ["Web"]
    },
    { 
      id: 13,
      title: "CrossExamination- Christian Apologetics Website",
      description: "A website that showcases different sources, facts and arguments regarding Christianity",
      media: {
        images: [`${BASE_URL}/media/Chris/ChristianWeb1.webp`, `${BASE_URL}/media/Chris/ChristianWeb2.webp`, `${BASE_URL}/media/Chris/ChristianWeb3.webp`, `${BASE_URL}/media/Chris/ChristianWeb4.webp`],
      },
      github: "https://github.com/MarkCockerill12/ChristianWeb",
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Vercel"],
      demo: "https://crossexamination.vercel.app/",
      details: "This website goes into depth regarding multiple aspects of both Christianity and other religions. It tackles numerous topics and arguments, such as the problem of Evil in the world, Historical/Archaeological reliability and Science vs Religion. It explores these meticulously, quoting sources and conveying information in an easy to understand way. The website includes a homepage, biblical timeline, topics page, personal story and resources page. The frontend is hosted on Vercel.",
      categories: ["Web"]
    },
    { 
      id: 12,
      title: "Investment Platform Project- University module sponsored by BarClays",
      description: "An all in one investment platform for both investors and pitch founders",
      media: {
        images: [`${BASE_URL}/media/Invest/Invest1.webp`, `${BASE_URL}/media/Invest/Invest2.webp`, `${BASE_URL}/media/Invest/Invest3.webp`, `${BASE_URL}/media/Invest/Invest4.webp`, `${BASE_URL}/media/Invest/Invest5.webp`, `${BASE_URL}/media/Invest/Invest6.webp`, `${BASE_URL}/media/Invest/Invest7.webp`, `${BASE_URL}/media/Invest/Invest8.webp`, `${BASE_URL}/media/Invest/Invest9.webp`, `${BASE_URL}/media/Invest/Invest10.webp`],
        video: `${BASE_URL}/media/Invest/DEMO.webm`,
      },
      technologies: ["Visual Studio Code", "React", "TypeScript", "Next.js", "Docker", "MongoDB", "Google Cloud"],
      details: "This project covers different aspects of an investment platform, covering the Frontend, Backend, BankAPI as well as MongoDB database. We created an intuitive and accessible website that allows users to create, browse and invest in different pitches. It handles transactions through a separate secure API and has a working notification system. My team took inspirations from other apps and websites such as CrowdCube and KickStarter.",
      categories: ["Web"]
    },
    { 
      id: 11,
      title: "ATM Simulation- University module sponsored by NCR",
      description: "An application that acts as a mock ATM for NCR",
      media: {
        images: [`${BASE_URL}/media/Agile/Agile2.webp`, `${BASE_URL}/media/Agile/Agile3.webp`, `${BASE_URL}/media/Agile/Agile4.webp`, `${BASE_URL}/media/Agile/Agile5.webp`, `${BASE_URL}/media/Agile/Agile6.webp`, `${BASE_URL}/media/Agile/Agile7.webp`, `${BASE_URL}/media/Agile/Agile8.webp`, `${BASE_URL}/media/Agile/Agile1.webp`, `${BASE_URL}/media/Agile/Agile9.webp`],
      },
      github: "https://github.com/MarkCockerill12/AC31007AgileGroup1",
      technologies: ["Visual Studio Code", "MySQL", "Go", "Amazon Web Services", "Docker", "React", "Electron", "Next.js", "Python", "Agile Methodologies"],
      details: "This mock ATM program was our task issued by NCR for learning agile methodologies, it utilises electron to showcase the front end, which handles the visual aspects. The front end then communicates with a Go-coded switch by sending JSON, the switch sorts out the different card numbers and sends them to a separate simulation which in turn interacts with information in a database.",
      categories: ["Web", "SQL"]
    },
    {
      id: 10,
      title: "SQL Company Website",
      description: "A website that interacts with a database in form of SQL",
      media: {
        images: [`${BASE_URL}/media/SteelSummit/Steel1.webp`, `${BASE_URL}/media/SteelSummit/Steel2.webp`, `${BASE_URL}/media/SteelSummit/Steel3.webp`, `${BASE_URL}/media/SteelSummit/Steel4.webp`, `${BASE_URL}/media/SteelSummit/Steel5.webp`, `${BASE_URL}/media/SteelSummit/Steel6.webp`, `${BASE_URL}/media/SteelSummit/Steel7.webp`, `${BASE_URL}/media/SteelSummit/Steel8.webp`],
      },
      github: "https://github.com/MarkCockerill12/DataAWS",
      technologies: ["Visual Studio Code", "MySQL", "PHP", "Amazon Web Services", "Docker"],
      details: "This mock company website interacts with a database with SQL and php in order to execute queries. It has predefined functions, an SQL builder and more. It has a functional php-sql login system. This was a university assignment and was hosted on amazon web servers, however for the testing and development, docker was used to set up local servers in order for them to interact.",
      categories: ["SQL", "Web"]
    },
    {
      id: 9,
      title: "Visual Novel Addon",
      description: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato",
      media: {
        images: [`${BASE_URL}/media/Doki/DokiDev.webp`, `${BASE_URL}/media/Doki/DokiGame.webp`],
      },
      technologies: ["RenPy", "PicsArt", "Visual Studio Code"],
      details: "A simple addon to Visual Novel 'Doki Doki Literature Club' by Team Salvato. This project was made for fun and the desire to experience the RenPy coding language.",
      categories: ["Game"]
    },
    {
      id: 8,
      title: "NextGen ATM Website",
      description: "A website that expands upon the possibilities of ATMs, sponsored by NCR for 2025 Dundee Hackathon",
      media: {
        images: [`${BASE_URL}/media/Hak-ATM/atm1.webp`, `${BASE_URL}/media/Hak-ATM/atm2.webp`, `${BASE_URL}/media/Hak-ATM/atm3.webp`, `${BASE_URL}/media/Hak-ATM/atm4.webp`],
      },
      github: "https://github.com/MarkCockerill12/Hak25--NCR",
      technologies: ["Visual Studio Code", "React", "Next.js", "Vercel"],
      demo: "https://hak25-ncr.vercel.app",
      details: "This mock ATM website was one of the projects my team took on during the 2025 Dundee Uni Hackathon. Our task was to create an ATM that would represent the future, and all the new functionalities that come with it. The website uses local storage to remember any additions you make to your bank account.",
      categories: ["Web", "SQL"]
    },
    {
      id: 7,
      title: "Raspberry Pi Pico Web Texter",
      description: "A program that uses Twilio and a Raspberry Pi Pico W to send text messages",
      media: {
        images: [`${BASE_URL}/media/Twilio/Twi1.webp`, `${BASE_URL}/media/Twilio/Twi2.webp`],
      },
      technologies: ["Python", "Twilio API", "Raspberry Pi Pico W"],
      details: "The Raspberry Pi W hosts a web server which allows the user to input text, the program then uses the Twilio API to send text messages through the pico.",
      categories: ["Python", "Raspberry Pi"]
    },
    {
      id: 6,
      title: "3D Animation- Penthouse",
      description: "An animation of my room becoming a penthouse suite",
      media: {
        images: [`${BASE_URL}/media/3D/Penthouse/Penthouse.webp`],
        video: `${BASE_URL}/media/3D/Penthouse/PenthouseVid.webm`,
      },
      technologies: ["Blender", "DaVinci Resolve"],
      details: "This project was a combination of real life and blender animation, using DaVinci Resolve video editor to join the two together.",
      categories: ["3D Animation"]
    },
    {
      id: 5,
      title: "Encrypted Login System with backdoor",
      description: "A login system that is supposedly secure",
      media: {
        images: [`${BASE_URL}/media/Wadiya/Wadiya1.webp`, `${BASE_URL}/media/Wadiya/Wadiya2.webp`],
      },
      github: "https://github.com/MarkCockerill12/VirusWadiya",
      technologies: ["Visual Studio Code", "C++"],
      details: `This project was a product of our University Information Security module, where we were tasked with making a login system with a backdoor that was incredibly difficult to crack if only looking at the code.`,
      categories: ["Cyber Security", "C/C++/C#"]
    },
    {
      id: 4,
      title: "This portfolio",
      description: "This very Portfolio, made with react and tailwind",
      media: {
        images: [`${BASE_URL}/media/Portfolio/Port1.webp`, `${BASE_URL}/media/Portfolio/Port2.webp`],
      },
      github: "https://github.com/MarkCockerill12/Portfolio",
      demo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      technologies: ["Visual Studio Code", "React", "Next.js", "TypeScript", "Tailwind", "Vercel", "Cloudflare R2"],
      details: "This project is the exact portfolio website you are looking at right now, hosting metadata databases securely in R2 and frontend logic on Vercel.",
      categories: ["Web"]
    },
    {
      id: 3,
      title: "Sonic Digital Drawing",
      description: "A drawing of Sonic, created on Krita",
      media: {
        images: [`${BASE_URL}/media/Sonic/Sonic.webp`, `${BASE_URL}/media/Sonic/SonicShow.webp`],
      },
      technologies: ["Krita"],
      details: "A digital drawing of Sonic the Hedgehog racing alongside Metal Sonic, created on Krita.",
      categories: ["Digital Art"]
    },
    {
      id: 2,
      title: "Chat Bot and Server",
      description: "A chat Bot and Server that interact with HexChat",
      media: {
        images: [`${BASE_URL}/media/HexChat/Hex1.webp`, `${BASE_URL}/media/HexChat/Hex2.webp`],
      },
      github: "https://github.com/MarkCockerill12/ChatBotLol",
      technologies: ["HexChat", "Python", "MiniIRC", "Visual Studio Code"],
      details: "A chat Bot and Server that interact with HexChat, the chat Bot responds to commands and user messages. The server attempts to replicate a MiniIRC server.",
      categories: ["Python"]
    },
    {
      id: 1,
      title: "Shrimp",
      description: "Shrimp",
      media: {
        images: [`${BASE_URL}/media/Shrimp/Shrimp.webp`, `${BASE_URL}/media/Shrimp/ShrimpShow.webp`],
      },
      technologies: ["C#", "Pure uncompromising genius", "Visual Studio"],
      details: "A shrimple program that asks if you are a shrimp or not.",
      categories: ["C/C++/C#", "Game"]
    }
  ],
  jobExperiences: [
    {
      id: 'Insights',
      title: "Enterprise Technology Intern @ Insights: 2026-Present",
      website: "https://www.insights.com",
      icon: "Code",
      items: [
        {
          id: 'insights-main',
          text: "Insights is a global leader in workplace experience and learning, providing solutions that help organizations and their people improve their products and services through data, research and technology."
        }
      ]
    },
    {
      id: 'Outlier',
      title: "Independent Contractor @ Outlier AI: 2025-Present",
      website: "https://www.outlier.ai",
      icon: "Code",
      items: [
        {
          id: 'outlier-main',
          text: "Outlier is a platform that connects subject matter experts to help build the world's most advanced Generative AI."
        },
        {
          id: 'outlier-details',
          text: `My work at Outlier consists of training AI models and reviewing their responses and provided code to make sure it is up to standard and there are no errors. I have worked on multiple projects, where I have had to:
<ul class="list-disc list-inside ml-6 mt-2">
  <li>Train AI models to respond to a specific prompt and rate their outputs based on truthfulness and other factors. This could take the form of complete code generation, refactoring, and testing.</li>
  <br>
  <li>Review different GitHub pull requests and issues, where I would have to read through the code and provide problem statements, requirements, and classifications.</li>
</ul>`
        }
      ]
    },
    {
      id: 'fish-works',
      title: "Retail Assistant @ The Fish Works: 2023-Present",
      website: "https://thefishworks.co.uk",
      icon: "FishSymbol",
      items: [
        {
          id: 'fish-works-main',
          text: "The Fish Works is a multi award winning fish and chip shop, recognized in 2023 for Best Quality Fish and Chips and ranked third in the UK. They were also ranked the second-place winner in the 2025 Takeaway of the Year category."
        },
        {
          id: 'fish-works-details',
          text: `The fish works is an extremely fast paced environment, where the team each need to carry out their roles under pressure. Some of my roles have been:
<ul class="list-disc list-inside ml-6 mt-2">
  <li>Serving customers on the till and at the counter, this requires effective communication skills, financial responsibility, critical thinking and de-escalation skills.</li>
  <br>
  <li>Preparing food items and topping up supplies, this requires multitasking, communication and teamwork, and the ability to work efficiently</li>
</ul>`
        }
      ]
    },
    {
      id: 'dusa',
      title: "Retail Assistant @ DUSA Premier: 2023-2024",
      website: "https://www.dusa.co.uk",
      icon: "Palette",
      items: [
        {
          id: 'dusa-main',
          text: "Having worked in DUSA Premier on Dundee University Campus this role required me to manage financial transactions at the till, communicate with customers and restock items wherever needed in the shop."
        },
        {
          id: 'dusa-details',
          text: "Effective communication was needed in order to navigate the working environment, as well as quick learning and multitasking."
        }
      ]
    }
  ],
  otherExperiences: [
    {
      id: 'hackathon25',
      title: "2025 Dundee Uni Hackathon",
      icon: "Code",
      items: [
        {
          id: 'hackathon25-main',
          text: "The Dundee University Hackathon is a 24-hour event where students are tasked with creating a project set out by a company with the chance to win prizes. Multiple companies sponsored this hackathon, such as Rockstar, BlackRock, NCR Atleos and Synechron."
        },
        {
          id: 'hackathon25-details',
          text: "BlackRock tasked us with creating an environmental events webpage, showcasing green efforts and upcoming activities and plans. NCR Atleos tasked us with creating an ATM that utilizes new innovative features to bring to future of finance to the current day. Synechron tasked us with making a simple game using GameMaker. My team tackled all of these projects, as I created the ATM independently for my group, I included it in the projects of this portfolio."
        }
      ]
    },
    {
      id: 'agile',
      title: "Agile Practices",
      icon: "Code",
      items: [
        {
          id: 'agile-main',
          text: "During our Universities agile module where we created an ATM simulation for NCR, we learned and displayed proper agile development practices through taking notes and GitHub. We used Kanban boards, planning poker, MoSCoW, retrospectives, sprint reviews, scrum meetings and more."
        }
      ]
    },
    {
      id: 'hackathon24',
      title: "2024 Dundee Uni Hackathon",
      icon: "Code",
      items: [
        {
          id: 'hackathon24-main',
          text: "Multiple companies sponsored this hackathon, such as BlackRock, NCR Atleos and GE Vernova."
        },
        {
          id: 'hackathon24-details',
          text: "BlackRock tasked us with creating a student friendly application, whether it be for shopping or studying and NCR Atleos tasking us with creating a map where we could plot ATM locations on. I attempted both of these tasks and was able to achieve second place in NCR Atleos' challenge."
        }
      ]
    },
    {
      id: 'holiday-club',
      title: "Helper @ Children Summer Holiday Club: 2016-Present",
      icon: "Gamepad",
      items: [
        {
          id: 'holiday-club-main',
          text: "I annually volunteer to help assist in a week-long children's mission in the northeast of Scotland. This involves utilizing my communication skills with other helpers and children. Each morning I have multiple responsibilities such as leading a specific group of primary pupils through activities, managing time and sorting conflicts. During afternoon social events I lead children with games as well as serving food to multiple families."
        }
      ]
    }
  ],
  educationHistory: [
    {
      institution: "Dundee University",
      years: "2022 - Present",
      qualification: "Bachelor of Science with Honours - Computing Science (BSc)",
      status: "Achieved",
      grade: {
        achieved: "1st",
        label: "Achieved Grade"
      }
    },
    {
      institution: "Largs Academy",
      years: "2016 - 2022",
      qualifications: [
        { subject: "Mathematics", level: "Higher", grade: "A" },
        { subject: "Graphic Communications", level: "Higher", grade: "B" },
        { subject: "English", level: "Higher", grade: "B" },
        { subject: "Computing Science", level: "Higher", grade: "B" },
        { subject: "Physics", level: "Higher", grade: "C" },
        { subject: "Chemistry", level: "Higher", grade: "C" }
      ]
    }
  ],
  modules: [
    {
      id: 'CS41001',
      name: 'Honours Project - Privacy Sentinel',
      year: 4,
      semester: 2,
      moduleGrade: 'A3 / 1st',
      description: 'Privacy Sentinel is a high-performance, multi-platform digital defence suite designed to restore digital sovereignty. Spanning Desktop, Mobile, and Browser environments, the system implements a unified security framework containing: a low-latency Direct-to-Spoke WireGuard VPN across 5 global regions; an AI Guardian powered by Groq LPUs for real-time website summarisation, translation, and trigger warning detection; an Intelligent Content Filter with DOM-level adblocking, blurring, redaction, and a custom "Kitten Mode" for mental well-being; and a heuristic CyberScanner to analyze phishing links and malicious domains. Deployed on cost-optimised AWS Graviton (ARM64) infrastructure via Terraform with automated auto-shutdown mechanisms, it was built using pnpm, Turborepo, Bun, Electron, Next.js, and Expo.',
    },
    {
      id: 'AC31007',
      name: 'Industrial Project',
      year: 4,
      semester: 1,
      moduleGrade: 'A1 / 1st',
      description: 'This project covers different aspects of an investment platform, covering the Frontend, Backend, BankAPI as well as MongoDB database. We created an intuitive and accessible website that allows users to create, browse and invest in different pitches. It handles transactions through a separate secure API and has a working notification system. The website securely holds user data and contains an online wallet.',
    },
    {
      id: 'AC51041',
      name: 'Devops and MicroServices',
      year: 4,
      semester: 1,
      moduleGrade: 'Provisional: A4 / 1st',
      description: 'This project is about developing a Booking system for conference rooms for my Developer Operations University Module. It integrates a simulated Weather Forecast system, AWS Lambda, S3, DynamoDB, Cognito, Cloudwatch as well as Stripe for the financial system and Vercel to host the front end.',
      projects: [
        {
          name: 'Preliminary Report',
          grade: 'A4 / 1st',
          description: 'I was tasked with creating a preliminary report outlining the architecture, design decisions and technologies to be used within the project. This included diagrams and explanations on how each microservice would interact with each other.'
        },
        {
          name: 'Full Dev Ops Service and CI/CD Pipeline',
          grade: 'A4 / 1st',
          description: 'The full service was created using a microservices architecture within a monorepo. Each microservice was containerised using Docker and deployed to AWS using GitHub Actions as the CI/CD pipeline.'
        }
      ]
    },
    {
      id: 'CS51009',
      name: 'Machine Learning',
      year: 4,
      semester: 1,
      moduleGrade: 'Provisional: B3 / 2:1',
      description: 'The point of this module was to gain an understanding of machine learning concepts and algorithms.',
      projects: [
        {
          name: 'Hurricane Dataset Assignment',
          grade: 'A1 / 1st',
          description: 'This project entailed training a machine learning model to predict the category of a hurricane based on various meteorological features. I preprocessed the data, selected relevant features, and experimented with different algorithms to achieve high accuracy.'
        }
      ]
    },
    {
      id: 'AC31007_Agile',
      name: 'Agile Software Engineering',
      year: 3,
      semester: 2,
      moduleGrade: 'B1 / 2:1',
      description: 'Introduction to Agile practices. We were tasked by NCR Atleos to create a full-stack application using Agile methodologies. This application was a recreation of an ATM system.',
      projects: [
        {
          name: 'Agile Methodologies Sprint/Week 1',
          grade: 'B2 / 2:1',
          description: 'Week one was spent building the foundations of the Front End and Back End. This consisting of a webpage, switch and database.'
        },
        {
          name: 'Agile Methodologies Sprint/Week 2',
          grade: 'B1 / 2:1',
          description: 'Week two was spent implementing further features and confirming everything was set up and working well together.'
        }
      ]
    },
    {
      id: 'CS23005',
      name: 'Mobile Application Development',
      year: 3,
      semester: 2,
      moduleGrade: 'A4 / 1st',
      description: 'Introduction to mobile application development. I used React Native to create a Bus App using the Google Maps API.',
      projects: [
        {
          name: 'Design Proposal',
          grade: 'A2 / 1st',
          description: 'Propose a mobile application idea and design. The application had to use some form of mobile phone input sensor.'
        },
        {
          name: 'Mobile App Creation',
          grade: 'A5 / 1st',
          description: 'Build the application with full functionality and give demo of it.'
        }
      ]
    },
    {
      id: 'AC31008',
      name: 'Networks',
      year: 3,
      semester: 1,
      moduleGrade: 'B3 / 2:1',
      description: 'Introduction to computer networks and network programming.',
      projects: [
        {
          name: 'Network Programming',
          grade: 'A5 / 1st',
          description: 'Created a client-server application implementing TCP/IP protocols as well as a bot to interact with it. This utilises HexChat.'
        },
        {
          name: 'Network Simulation',
          grade: 'A4 / 1st',
          description: 'Configured and simulated a network using Cisco Packet Tracer.'
        }
      ]
    },
    {
      id: 'AC31012',
      name: 'Information Security',
      year: 3,
      semester: 1,
      moduleGrade: 'A5 / 1st',
      description: 'Introduction to information security and cryptography.',
      projects: [
        {
          name: 'Applied Cryptography',
          grade: 'A3 / 1st',
          description: 'Created a login program with a backdoor that requires careful examining of the code as well as decryption and brute forcing to bypass.'
        },
        {
          name: 'Ethical Hacking',
          grade: 'A2 / 1st',
          description: 'The task was to attempt to crack other students login problems and take advantage of their vulnerabilities.'
        }
      ]
    },
    {
      id: 'AC32006',
      name: 'Database Systems',
      year: 3,
      semester: 1,
      moduleGrade: 'B2 / 2:1',
      description: 'Database design, implementation and management.',
      projects: [
        {
          name: 'Database Design',
          grade: 'B1 / 2:1',
          description: 'Designed and created a specification, entity-relationship diagram and SQL statements for a database system and company.'
        },
        {
          name: 'Database Implementation',
          grade: 'B2 / 2:1',
          description: 'Built a full-stack application with database integration utilizing HTML, SQL and PHP.'
        }
      ]
    }
  ],
  certificates: [
    {
      id: 'cert1',
      title: 'Cyber Security Vulnerability Certificate',
      description: 'Using Hacksplain.com, I completed a series of lessons and tests educating on the different types of security vulnerabilities and how to prevent them from occurring.',
      image: `${BASE_URL}/media/Certificates/hacksplain.webp`
    },
    {
      id: 'cert2',
      title: 'Allergen Training Certificate',
      description: 'As a result of my work in the Award winning fish and chip shop, The Fish Works, I was able to undergo training on allergen awareness and management.',
      image: `${BASE_URL}/media/Certificates/allergen.webp`
    },
    {
      id: 'cert3',
      title: 'Check My Links Certification',
      description: 'I achieved this certificate by completing a series of lessons and tests on the Check My Links platform, educating on how to use the extension in order to web crawl and analyse links, as well as different error codes.',
      image: `${BASE_URL}/media/Certificates/LinksCert.webp`
    },
    {
      id: 'cert4',
      title: 'Certification of Higher Maths',
      description: 'I was awarded this certificate at graduation as a showcase of exemplary math skills during coursework and exams.',
      image: `${BASE_URL}/media/Certificates/maths.webp`
    }
  ]
}
