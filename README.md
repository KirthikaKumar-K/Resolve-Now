Support Ticket System

A full-stack Support Ticket System built with React (TypeScript) and
Spring Boot. When a user raises a ticket, it is stored in the database
and automatically created as a GitHub Issue.

==================================================

SETUP INSTRUCTIONS

1.  Clone the Repository

git clone https://github.com//Resolve-Now.git cd
Support-Ticket-System

==================================================

GITHUB INTEGRATION SETUP (IMPORTANT)

This project creates GitHub Issues automatically when users raise
tickets. You must configure GitHub credentials before running the
backend.

==================================================

STEP 1: Create .env File

Create a file inside the backend folder:

backend/.env

Add the following content:

GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
GITHUB_OWNER=YOUR_GITHUB_USERNAME_OR_ORG
GITHUB_REPO=YOUR_REPOSITORY_NAME

==================================================

STEP 2: Generate GitHub Personal Access Token (PAT)

1.  Open: https://github.com/settings/apps then click on Personal Access Tokens

2.  Click “Generate new token” -> Fine grained Tokens

3.  Name it: Resolve Now

4.  Select permissions:

    -   repo(read and write), issues(read and write) metadata(read)
    -   workflow (optional)
    -   project (optional)

5.  Generate token and copy it.

DO NOT SHARE THIS TOKEN OR COMMIT IT TO GITHUB.

==================================================

STEP 3: Get GitHub Username (OWNER)

Your GitHub username is in your profile URL:

https://github.com/

Example: GITHUB_OWNER=KirthikaKumar-K

==================================================

STEP 4: Get Repository Name (REPO)

Your repository URL:

https://github.com//

Example: GITHUB_REPO=Resolve-Now

==================================================

RUN BACKEND

cd backend mvn spring-boot:run

Backend runs on: http://localhost:8080

==================================================

RUN FRONTEND

cd src npm install npm run dev

Frontend runs on: http://localhost:5173

==================================================

SECURITY NOTES

1.  Never commit backend/.env to GitHub
2.  Add this to .gitignore:

backend/.env

3.  Revoke leaked PAT tokens immediately.

==================================================
