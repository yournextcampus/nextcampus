import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ApplicationData {
  applicantType: 'home' | 'international';
  fullName: string;
  email: string;
  phone: string;
  highestQualification: string;
  intendedLevel: string;
  intendedSubject: string;
  preferredIntake: string;
  englishTest?: string;
  budget?: string;
  ucasStatus?: string;
  message?: string;
  consent: boolean;
  submittedAt: string;
}

function generatePDFContent(data: ApplicationData): string {
  const isHome = data.applicantType === 'home';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1e3a8a; padding-bottom: 20px; }
    .logo { color: #1e3a8a; font-size: 24px; font-weight: bold; margin-bottom: 10px; }
    .title { color: #1e3a8a; font-size: 20px; margin-bottom: 5px; }
    .subtitle { color: #666; font-size: 14px; }
    .section { margin: 25px 0; }
    .section-title { color: #1e3a8a; font-size: 16px; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; }
    .field { margin: 10px 0; display: flex; }
    .field-label { font-weight: bold; width: 180px; color: #374151; }
    .field-value { color: #111827; }
    .badge { display: inline-block; background: ${isHome ? '#dbeafe' : '#fed7aa'}; color: ${isHome ? '#1e40af' : '#ea580c'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🎓 Next Campus</div>
    <div class="title">UK University Application</div>
    <div class="subtitle">Student Application Form Submission</div>
    <div style="margin-top: 15px;">
      <span class="badge">${isHome ? 'Home Student' : 'International Student'}</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Personal Information</div>
    <div class="field">
      <div class="field-label">Full Name:</div>
      <div class="field-value">${data.fullName}</div>
    </div>
    <div class="field">
      <div class="field-label">Email:</div>
      <div class="field-value">${data.email}</div>
    </div>
    <div class="field">
      <div class="field-label">Phone/WhatsApp:</div>
      <div class="field-value">${data.phone}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Academic Information</div>
    <div class="field">
      <div class="field-label">Highest Qualification:</div>
      <div class="field-value">${data.highestQualification}</div>
    </div>
    <div class="field">
      <div class="field-label">Intended Level:</div>
      <div class="field-value">${data.intendedLevel}</div>
    </div>
    <div class="field">
      <div class="field-label">Intended Subject:</div>
      <div class="field-value">${data.intendedSubject}</div>
    </div>
    <div class="field">
      <div class="field-label">Preferred Intake:</div>
      <div class="field-value">${data.preferredIntake}</div>
    </div>
    ${data.englishTest ? `
    <div class="field">
      <div class="field-label">English Test Score:</div>
      <div class="field-value">${data.englishTest}</div>
    </div>
    ` : ''}
    ${data.budget ? `
    <div class="field">
      <div class="field-label">Budget Range:</div>
      <div class="field-value">${data.budget}</div>
    </div>
    ` : ''}
    ${data.ucasStatus ? `
    <div class="field">
      <div class="field-label">UCAS Status:</div>
      <div class="field-value">${data.ucasStatus}</div>
    </div>
    ` : ''}
  </div>

  ${data.message ? `
  <div class="section">
    <div class="section-title">Additional Message</div>
    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3a8a;">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
  </div>
  ` : ''}

  <div class="section">
    <div class="section-title">Submission Details</div>
    <div class="field">
      <div class="field-label">Submitted:</div>
      <div class="field-value">${new Date(data.submittedAt).toLocaleString('en-GB', { 
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (UK Time)</div>
    </div>
    <div class="field">
      <div class="field-label">Consent Given:</div>
      <div class="field-value">✅ Yes - Data processing consent provided</div>
    </div>
  </div>

  <div class="footer">
    <p><strong>Next Campus UK</strong> | Education Consultancy</p>
    <p>This application was submitted through nextcampus.uk</p>
    <p>Generated on ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} (UK Time)</p>
  </div>
</body>
</html>
  `.trim();
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      })
    }

    const applicationData: ApplicationData = await req.json()
    
    // Add submission timestamp
    applicationData.submittedAt = new Date().toISOString()

    // Generate PDF content
    const htmlContent = generatePDFContent(applicationData)
    
    // Convert HTML to PDF using Puppeteer
    const pdfResponse = await fetch('https://api.htmlcsstoimage.com/v1/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('your-api-key:')
      },
      body: JSON.stringify({
        html: htmlContent,
        css: '',
        google_fonts: 'Arial',
        format: 'pdf',
        width: 800,
        height: 1200
      })
    })

    if (!pdfResponse.ok) {
      throw new Error('Failed to generate PDF')
    }

    const pdfBuffer = await pdfResponse.arrayBuffer()
    const pdfBase64 = btoa(String.fromCharCode(...new Uint8Array(pdfBuffer)))

    // Prepare email data
    const isHome = applicationData.applicantType === 'home'
    const emailSubject = `[Apply][${isHome ? 'Home' : 'International'}] ${applicationData.fullName} – ${applicationData.preferredIntake} – ${applicationData.intendedSubject}`
    
    const emailBody = `
New ${isHome ? 'Home' : 'International'} Student Application Received

Student Details:
- Name: ${applicationData.fullName}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- Subject: ${applicationData.intendedSubject}
- Level: ${applicationData.intendedLevel}
- Intake: ${applicationData.preferredIntake}

${isHome ? `UCAS Status: ${applicationData.ucasStatus || 'Not specified'}` : ''}
${applicationData.englishTest ? `English Test: ${applicationData.englishTest}` : ''}
${applicationData.budget ? `Budget: ${applicationData.budget}` : ''}

${applicationData.message ? `Message: ${applicationData.message}` : ''}

Submitted: ${new Date(applicationData.submittedAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })} (UK Time)

Please find the complete application details in the attached PDF.

---
Next Campus UK
Automated Application System
    `.trim()

    // Send email using a service like Resend or SendGrid
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'leads@nextcampus.uk',
        to: ['nextcampus.info@gmail.com'],
        reply_to: applicationData.email,
        subject: emailSubject,
        text: emailBody,
        attachments: [
          {
            filename: `application-${applicationData.fullName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`,
            content: pdfBase64,
            content_type: 'application/pdf'
          }
        ]
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Email sending failed:', errorText)
      throw new Error('Failed to send email')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Application submitted successfully',
        submissionId: `APP-${Date.now()}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Error processing application:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process application. Please try again or contact support.' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})