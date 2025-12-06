# Bookings Admin Dashboard - Dev Study Case

A full-stack bookings management application with a React frontend and Express backend using DynamoDB for data storage.

## 🏗️ Architecture

- **Frontend**: React with Redux
- **Backend**: Express server simulating AWS Lambda functions
- **Database**: DynamoDB local (via Docker)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for DynamoDB local)

### Installing Docker

If you don't have Docker installed, you can use Docker Desktop:

- Download Docker Desktop from https://www.docker.com/products/docker-desktop
- Open the downloaded .dmg file and drag Docker to Applications
- Launch Docker Desktop from Applications
- Verify installation : 

```bash
docker --version
```

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

### Install root dependencies
```bash
npm install
```

### Install backend dependencies
```bash
cd backend
npm install
cd ..
```

### Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### 2. Rename .env.dist file

In the backend folder, there is the file `.env.dist`: rename it to `.env` to allow the system to use the environment values.

The .env file has to contain this kind of structure:

```env
DDB_ENDPOINT=http://localhost:8000
BOOKINGS_TABLE=Bookings
GUESTS_TABLE=Guests
AWS_REGION=eu-central-1
AWS_ACCESS_KEY_ID=fakeMyKeyId
AWS_SECRET_ACCESS_KEY=fakeSecretAccessKey
```

Note: The AWS credentials are fake values required by the AWS SDK but not validated by DynamoDB Local.


### 3. Setup DynamoDB Local with Docker

Start DynamoDB Local:

```bash
docker run -d -p 8000:8000 --name dynamodb-local public.ecr.aws/aws-dynamodb-local/aws-dynamodb-local:latest
```

### 4. Seed the Database

Create the DynamoDB tables and populate them with test data:

```bash
cd backend
npm run seed
```

### 5. Start the Backend

```bash
cd backend
npm start
```

### 6. Start the Frontend

In a new terminal: 

```bash
cd frontend
npm start
```


