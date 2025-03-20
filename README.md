📌 Todo Application
A fully functional and responsive Todo web application with authentication, database integration, and protected routes. Built using Next.js, PostgreSQL, Prisma, NextAuth, and TailwindCSS, this app provides seamless task management with real-time updates and a secure user experience.

🚀 Features
✅ User Authentication: Google OAuth & Credentials (email/password)
✅ Secure Data Handling: User-specific tasks with proper authorization
✅ Task Management: Add, edit, delete tasks in real-time
✅ Protected Routes: Only authenticated users can access the dashboard
✅ Fully Responsive: Works across all devices
✅ Modern UI: Styled with TailwindCSS and ShadCN UI
✅ Optimized Performance: Server-side rendering (SSR) and static generation (SSG)

🛠️ Technology Stack
Category	Technology
Frontend & Backend	Next.js (App Router)
Database	PostgreSQL with Prisma ORM
Authentication	NextAuth.js (Google + Credentials)
Styling	TailwindCSS + ShadCN UI
Testing	Jest
Deployment	Vercel/Netlify/GCP
📥 Installation & Setup
1️⃣ Clone the Repository

bash
Copy
Edit
git clone https://github.com/sanwalkhan/goaccelovate-assesment-.git
2️⃣ Navigate to the Project Folder

bash
Copy
Edit
cd goaccelovate-assesment-
3️⃣ Install Dependencies

bash
Copy
Edit
npm install
4️⃣ Set Up Environment Variables

Create a .env file in the root directory and add the required environment variables:

ini
Copy
Edit
DATABASE_URL=your_postgresql_database_url
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
5️⃣ Run Prisma Migrations

bash
Copy
Edit
npx prisma migrate dev --name init
6️⃣ Start the Development Server

bash
Copy
Edit
npm run dev
🔗 Deployment
You can deploy this application to Vercel, Netlify, or Google Cloud by pushing your code to GitHub and linking it with a deployment platform.

For Vercel:

bash
Copy
Edit
vercel deploy
🔍 Additional Notes
This project was built with the help of online resources, documentation, and AI-powered tools such as ChatGPT and other LLMS (Large Language Models) to enhance efficiency and solve challenges effectively.







