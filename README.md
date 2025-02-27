(Due to technical issues, the search service is temporarily unavailable.)

# Next.js Authentication System

A modern authentication system built with Next.js 15, featuring server-side rendering, server actions, and secure user authentication.

## Features

- 🔐 Secure Authentication with JWT tokens
- 🔒 Password hashing with Argon2
- 🛡️ Protected routes with middleware
- 🎯 Server Actions for form handling
- 📝 Form validation with Zod
- 🎨 Modern UI with shadcn/ui components
- �🐳 Docker support for PostgreSQL
- 🔄 Type-safe database queries with Drizzle ORM
- ⚡ Server-side rendering with Next.js App Router
- 🌐 Responsive design

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT (jose)
- **Password Hashing**: Argon2
- **Form Validation**: Zod
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Container**: Docker
- **Type Safety**: TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.17 or later
- Docker and Docker Compose
- pnpm (recommended) or npm

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root of your project.
   - Copy the contents of the provided `.env` example into your `.env` file.
   - Replace the placeholder values with your own credentials:

     ```env
     # Database
     DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdb"
     SECRET_KEY="yoursecretkey"

     # PostgreSQL
     DB_USER="youruser"
     DB_PASSWORD="yourpassword"
     DB_NAME="yourdb"
     DB_HOST="localhost"
     ```

4. **Start Docker container for PostgreSQL**

   - Ensure Docker is running on your machine.
   - Run the following command to start the PostgreSQL container:
     ```bash
     docker-compose up -d
     ```
   - This will start a PostgreSQL instance with the credentials specified in your `.env` file.

5. **Run database migrations**

   - Apply the necessary database migrations using Drizzle:
     ```bash
     pnpm drizzle-kit push:pg
     ```
   - This will set up the database schema required for the application.

6. **Start the development server**

   - Run the Next.js development server:
     ```bash
     pnpm dev
     ```
   - The application should now be running on `http://localhost:3000`.

7. **Build and run for production**
   - To build the application for production:
     ```bash
     pnpm build
     ```
   - To start the production server:
     ```bash
     pnpm start
     ```

## Docker Compose Configuration

The `docker-compose.yml` file is configured to run a PostgreSQL container with the following settings:

```yaml
services:
  db:
    image: postgres:latest
    container_name: auth-db
    volumes:
      - ./data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
```

- **Volumes**: The `./data` directory is used to persist PostgreSQL data on your local machine.
- **Ports**: PostgreSQL is exposed on port `5432` on your localhost.
- **Environment Variables**: The database credentials are pulled from your `.env` file.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---
