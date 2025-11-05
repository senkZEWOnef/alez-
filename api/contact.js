// Vercel API route for handling contact form submissions
// This file should be deployed to handle form submissions

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, phone, subject, message, preferredContact, projectType } = req.body

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Prepare email content
    const emailContent = {
      to: 'info@pvchaiti.com', // Your business email
      from: 'noreply@pvchaiti.com', // Verified sender
      subject: `PVC Cabinets Haiti - ${subject}: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0E7C66; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0E7C66; }
            .value { margin-top: 5px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PVC Cabinets Haiti</h1>
              <p>New Contact Form Submission</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              
              ${preferredContact ? `
              <div class="field">
                <div class="label">Preferred Contact Method:</div>
                <div class="value">${preferredContact}</div>
              </div>
              ` : ''}
              
              ${projectType ? `
              <div class="field">
                <div class="label">Project Type:</div>
                <div class="value">${projectType}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value" style="white-space: pre-line;">${message}</div>
              </div>
              
              <div class="field">
                <div class="label">Submitted:</div>
                <div class="value">${new Date().toLocaleString('fr-FR', { 
                  timeZone: 'America/Port-au-Prince',
                  dateStyle: 'full',
                  timeStyle: 'medium'
                })}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>PVC Cabinets Haiti by Zewo | Professional PVC Cabinet Installation</p>
              <p>+509 3212 3456 | info@pvchaiti.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    }

    // Here you would integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll simulate the email sending
    console.log('Email would be sent:', emailContent)

    // Example SendGrid integration (uncomment and configure):
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    
    await sgMail.send(emailContent)
    */

    // Example Mailgun integration (uncomment and configure):
    /*
    const formData = require('form-data')
    const Mailgun = require('mailgun.js')
    const mailgun = new Mailgun(formData)
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY
    })
    
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: emailContent.from,
      to: emailContent.to,
      subject: emailContent.subject,
      html: emailContent.html
    })
    */

    // Also save to database if needed
    // Example Neon/PostgreSQL integration:
    /*
    const { Pool } = require('pg')
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
    
    await pool.query(
      'INSERT INTO contact_submissions (name, email, phone, subject, message, preferred_contact, project_type, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
      [name, email, phone, subject, message, preferredContact, projectType]
    )
    */

    res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process contact form submission'
    })
  }
}