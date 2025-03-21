# Todo Application

A fully functional and responsive Todo web application with authentication, database integration, and protected routes built using Next.js, PostgreSQL, Prisma, NextAuth, and TailwindCSS.

## Features

- User authentication with Google OAuth and credentials (email/password)
- Secure user data handling
- Dashboard to manage tasks (add, edit, delete)
- Real-time updates without page refreshes
- Protected routes for authenticated users only
- Fully responsive design for all devices

## Technology Stack

- **Frontend & Backend**: Next.js (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Google + Credentials)
- **Styling**: TailwindCSS + ShadCN UI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sanwalkhan/goaccelovate-assesment-.git
   cd goaccelovate-assesment-
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/todo_db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Create tables in your database
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Setting Up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Navigate to "APIs & Services" > "Credentials"
4. Configure the OAuth consent screen
5. Create OAuth client ID credentials (Web application)
6. Add authorized JavaScript origins: `http://localhost:3000`
7. Add authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
8. Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth authentication
│   │   └── todos/        # Todo API endpoints
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   ├── register/         # Register page
│   └── layout.tsx        # Root layout
├── components/           # UI components
├── lib/                  # Utility functions
├── prisma/               # Prisma schema and migrations
└── public/               # Static assets
```

## Usage

- Register an account or sign in with Google
- Add, edit, and delete todos from your dashboard
- Mark todos as complete/incomplete
- Log out when finished

## Development

### Database Schema

The Prisma schema defines two main models:
- `User`: For user authentication and profile information
- `Todo`: For storing todo items linked to users

To modify the schema, edit the `prisma/schema.prisma` file and run:
```bash
npx prisma db push
```

### Authentication

Authentication is handled by NextAuth.js with two providers:
- Google OAuth for social login
- Credentials provider for email/password

## Production Deployment

For production deployment:

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   # or
   pnpm start
   ```

## Additional Notes

In this project i also take help of online resources, documentation, and AI-powered tools such as ChatGPT and other LLMs (Large Language Models).