# Next Campus UK - Education Website

A comprehensive education consultancy website for UK university applications, tailored for both Home and International students.

## Features

- **Audience-Specific Content**: Tailored experience for Home vs International students
- **Lead Capture**: Application and consultation forms with PDF email generation
- **University Showcase**: Searchable university database with filtering
- **Requirements Guide**: Detailed checklists for both student types
- **Success Stories**: Student testimonials and case studies
- **FAQ System**: Audience-specific frequently asked questions

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Required variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `RESEND_API_KEY`: API key for email service (used in Edge Functions)

### 2. Supabase Setup

The website uses Supabase Edge Functions for form processing and email sending:

1. **Connect to Supabase**: Click the "Connect to Supabase" button in the top right
2. **Deploy Edge Functions**: The functions are automatically deployed when you connect

### 3. Email Configuration

The forms send PDFs to `nextcampus.info@gmail.com`. To set this up:

1. Sign up for [Resend](https://resend.com) (recommended) or another email service
2. Add your API key to the environment variables
3. Verify your sending domain in the email service

### 4. Form Submissions

Both application and consultation forms generate PDFs and send them via email:

**Application Form**:
- Generates detailed PDF with all student information
- Sends to: `nextcampus.info@gmail.com`
- Subject: `[Apply][Home|International] Name – Intake – Subject`

**Consultation Form**:
- Generates consultation booking PDF
- Sends to: `nextcampus.info@gmail.com`
- Subject: `[Consultation][Home|International] Name – Topic`

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components
│   ├── FAQ.tsx         # FAQ accordion
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   └── ...
├── contexts/           # React contexts
├── pages/              # Page components
├── types/              # TypeScript definitions
└── App.tsx            # Main application

supabase/
└── functions/          # Edge Functions
    ├── submit-application/
    └── submit-consultation/
```

## Key Features

### Student Type Selection
- Persistent choice storage in localStorage
- Toggle switch in header for easy switching
- All content adapts based on selection

### Audience-Specific Content
- **Home Students**: UCAS guidance, £9,250 fees, Student Finance
- **International Students**: Visa support, £14-22k+ fees, CAS process

### Lead Capture System
- Professional PDF generation for all submissions
- Automatic email routing to admissions team
- GDPR-compliant consent handling

## Deployment

The website is ready for deployment to any static hosting provider. All dynamic functionality is handled through Supabase Edge Functions.

## Support

For technical support or questions about the implementation, please refer to the documentation or contact the development team.