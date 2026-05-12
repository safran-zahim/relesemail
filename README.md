# Email Generator

A professional email generator for product releases and internal communications. Built with React, TypeScript, and Vite.

## Features

- **Release Email Template**: Create stunning release announcement emails with feature categories, highlights, and hosted environment details.
- **Live Preview**: See your changes in real-time with a built-in iframe preview.
- **Copy & Download**: Copy the generated HTML to your clipboard or download it as an `.html` file.
- **Payload Tracking**: Monitor the size of your email to ensure it stays within common email client limits (e.g., 700KB).
- **Smooth Navigation**: Synchronized scrolling between the editor and the preview.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository or download the source code.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173/`.

### Building for Production

To create a production build:
```bash
npm run build
```
The output will be in the `dist` directory.

## Usage

1. Fill in the **Branding & Identity** section with your company details.
2. Customize the **Hero Section** and **Feature Categories**.
3. Add **New Feature Highlights** with images and CTA links.
4. Preview the email on the right side of the screen.
5. Use the **Copy HTML** or **Download** buttons to export your email.

## Environment Configuration

To send emails via Gmail, you need to configure environment variables in `.env.local`. See `.env.example` for all required variables.

### Setting Up Gmail API Credentials

#### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the **Gmail API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

#### 2. Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client ID"
3. Select "Desktop application"
4. Download the credentials JSON file
5. Copy the `client_id` and `client_secret` to `.env.local`:
   ```
   GMAIL_CLIENT_ID=your_client_id
   GMAIL_CLIENT_SECRET=your_client_secret
   ```

#### 3. Get a Refresh Token

1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the settings icon (gear) in top right
3. Check "Use your own OAuth credentials" and enter your Client ID and Client Secret
4. In the left panel, select "Gmail API v1" > "https://www.googleapis.com/auth/gmail.send"
5. Click "Authorize APIs"
6. After authorization, in Step 2, click "Exchange authorization code for tokens"
7. Copy the `refresh_token` value to `.env.local`:
   ```
   GMAIL_REFRESH_TOKEN=your_refresh_token
   ```

#### 4. Configure Gmail User and API Key

Add your email and a secret key to `.env.local`:
```
GMAIL_USER=your_email@gmail.com
MY_SECRET_KEY=your_secret_key_for_api
TEST_RECIPIENT=test_email@example.com
TEST_SUBJECT=Test Email Subject
```

### Sending Test Emails

Once configured, use the send script to test:
```bash
node send.js
```

This will send a test email using the generated HTML output.
