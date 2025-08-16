# Anihad CRM - Backend

Anihad CRM is an open-source client relationship manager built with Node.js, PostgreSQL, and Next.js. This repository contains the backend code for the project.

## Features

  - **PostgreSQL:** Utilizes PostgreSQL for scalable read and write operations, ensuring data integrity and performance.
  - **End-to-End Type Safety:** Achieves full type safety across the backend with Express and Drizzle ORM.
  - **Scalable Mail Job Queue:** Implements a robust mail job queue system using BullMQ to handle email delivery efficiently.
  - **Docker-Ready Setup:** Includes a Docker-ready configuration for easy deployment on all major cloud providers.
  - **Built-in Environment Variable Checks:** Ensures all necessary environment variables are present and configured correctly at startup.
  - **JWT Authentication:** Features built-in JSON Web Token (JWT) authentication with a secure refresh token strategy.
  - **Production-Ready Logging:** Integrates a production-ready logging system with Pino for detailed and efficient log management.

## Getting Started

### Prerequisites

  - Node.js
  - PostgreSQL
  - Redis
  - Docker (optional, for containerized setup)

### Running in Development

1.  **Environment Setup:** Create a `.env.local` file in the project root and add the following environment variables:

    ```ini
    NODE_ENV=development
    PORT=3000
    DB_URL=postgres://user:password@host:port/database
    PINO_LOG_LEVEL=info
    REDIS_HOST=localhost
    REDIS_PORT=6379
    JWT_SECRET=your_jwt_secret_key
    REFRESH_SECRET=your_refresh_secret_key
    ```

2.  **Run the Server:** Start the development server with the following command:

    ```bash
    npm run dev
    ```

### Building for Production

1.  **Environment Setup:** Create a `.env` file for production and include the required variables. The values should be configured for your production environment.

    **Note:** The variables are the same as the development configuration.

2.  **Database Migrations:** Before starting the application, ensure all database migrations have been applied to your PostgreSQL instance. Run the following command to apply pending migrations:

    ```bash
    npm run migrate
    ```

3.  **Build and Start:** Build the application and then start the production server:

    ```bash
    npm run build
    npm run start
    ```

### Building with Docker

For a containerized setup, you can use the provided Docker Compose file to run the application along with all its services.

1.  **Environment Setup:** Ensure you have created a `.env` file with the required variables listed above, as it will be used by the Docker Compose file.

2.  **Run with Docker Compose:** Execute the following command to build the images and start all the services:

    ```bash
    docker compose up --build
    ```