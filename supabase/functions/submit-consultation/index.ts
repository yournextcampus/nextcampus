import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ConsultationData {
  applicantType: 'home' | 'international';
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  preferredDateTime: string;
  message?: string;
  consent: boolean;
  submittedAt: string;
}

function generateConsultationPDFContent(data: ConsultationData): string {
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
    .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">📅 Next Campus</div>
    <div class="title">Consultation Booking Request</div>
    <div class="subtitle">Free Educational Guidance Session</div>
    <div style="margin-top: 15px;">
      <span class="badge">${isHome ? 'Home Student' : 'International Student'}</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Contact Information</div>
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
    <div class="section-title">Consultation Details</div>
    <div class="field">
      <div class="field-label">Topic:</div>
      <div class="field-value">${data.topic}</div>
    </div>
    <div class="field">
      <div class="field-label">Preferred Date/Time:</div>
      <div class="field-value">${new Date(data.preferredDateTime).toLocaleString('en-GB', { 
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })} (UK Time)</div>
    </div>
  </div>

  ${data.message ? `
  <div class="section">
    <div class="section-title">Additional Message</div>
    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #1e3a8a;">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
  </div>
  ` : ''}

  <div class="highlight">
    <strong>⚠️ Action Required:</strong> Please contact the student within 24 hours to confirm the consultation appointment.
  </div>

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
    <p>This consultation request was submitted through nextcampus.uk</p>
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

    const consultationData: ConsultationData = await req.json()
    
    // Add submission timestamp
    consultationData.submittedAt = new Date().toISOString()

    // Generate PDF content
    const htmlContent = generateConsultationPDFContent(consultationData)
    
    // For now, we'll simulate PDF generation and email sending
    // In production, you would integrate with services like:
    // - Puppeteer for PDF generation
    // - Resend/SendGrid for email sending
    
    console.log('Consultation request received:', consultationData)
    console.log('Generated PDF content length:', htmlContent.length)

    // Prepare email data
    const isHome = consultationData.applicantType === 'home'
    const emailSubject = `[Consultation][${isHome ? 'Home' : 'International'}] ${consultationData.fullName} – ${consultationData.topic}`
    
    const emailBody = `
New ${isHome ? 'Home' : 'International'} Student Consultation Request

Student Details:
- Name: ${consultationData.fullName}
- Email: ${consultationData.email}
- Phone: ${consultationData.phone}
- Topic: ${consultationData.topic}
- Preferred Date/Time: ${new Date(consultationData.preferredDateTime).toLocaleString('en-GB', { timeZone: 'Europe/London' })} (UK Time)

${consultationData.message ? `Message: ${consultationData.message}` : ''}

Submitted: ${new Date(consultationData.submittedAt).toLocaleString('en-GB', { timeZone: 'Europe/London' })} (UK Time)

⚠️ ACTION REQUIRED: Please contact the student within 24 hours to confirm the consultation appointment.

---
Next Campus UK
Automated Consultation System
    `.trim()

    // Simulate successful email sending
    console.log('Email would be sent to: nextcampus.info@gmail.com')
    console.log('Email subject:', emailSubject)
    console.log('Email body:', emailBody)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Consultation request submitted successfully',
        bookingId: `CONSULT-${Date.now()}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )

  } catch (error) {
    console.error('Error processing consultation request:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to process consultation request. Please try again or contact support.' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    )
  }
})