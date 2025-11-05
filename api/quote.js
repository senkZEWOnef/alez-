// Vercel API route for handling quote form submissions
// This file should be deployed to handle quote form submissions

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
    const {
      name, email, phone, address, projectType, roomDimensions,
      cabinetStyle, finish, features, budget, timeline,
      existingCabinets, renovationType, additionalNotes,
      preferredContact, visitRequired
    } = req.body

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'address', 'projectType', 'cabinetStyle', 'finish', 'budget', 'timeline']
    const missingFields = requiredFields.filter(field => !req.body[field])
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        missingFields 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Validate room dimensions if provided
    if (roomDimensions && (!roomDimensions.length || !roomDimensions.width || !roomDimensions.height)) {
      return res.status(400).json({ error: 'Incomplete room dimensions' })
    }

    // Calculate estimated area and cost
    const estimatedArea = roomDimensions ? roomDimensions.length * roomDimensions.width : 0
    const estimatedVolume = roomDimensions ? roomDimensions.length * roomDimensions.width * roomDimensions.height : 0
    
    // Basic cost estimation (this would be more sophisticated in reality)
    const basePricePerSqFt = 450 // HTG
    const estimatedBaseCost = estimatedArea * basePricePerSqFt
    
    // Feature multipliers
    const featureMultipliers = {
      'soft-close-hinges': 1.1,
      'pull-out-drawers': 1.15,
      'lazy-susan': 1.05,
      'crown-molding': 1.08,
      'under-cabinet-lighting': 1.12,
      'glass-doors': 1.1,
      'wine-rack': 1.05,
      'spice-rack': 1.03
    }
    
    let featureMultiplier = 1
    if (features && features.length > 0) {
      featureMultiplier = features.reduce((mult, feature) => 
        mult * (featureMultipliers[feature] || 1), 1
      )
    }
    
    const estimatedCost = Math.round(estimatedBaseCost * featureMultiplier)

    // Prepare detailed email content
    const emailContent = {
      to: 'info@pvchaiti.com',
      from: 'noreply@pvchaiti.com',
      subject: `PVC Cabinets Haiti - Quote Request: ${name} (${projectType})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Quote Request</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 700px; margin: 0 auto; padding: 20px; }
            .header { background: #0E7C66; color: white; padding: 20px; text-align: center; }
            .section { background: #f9f9f9; margin: 20px 0; padding: 20px; border-left: 4px solid #0E7C66; }
            .section h3 { margin-top: 0; color: #0E7C66; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 3px; }
            .estimate { background: #e8f5f3; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
            .urgent { background: #fff3cd; border-left-color: #f4a340; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>PVC Cabinets Haiti</h1>
              <p>New Quote Request - ${projectType.toUpperCase()}</p>
            </div>
            
            <div class="section">
              <h3>Customer Information</h3>
              <div class="grid">
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
                  <div class="label">Preferred Contact:</div>
                  <div class="value">${preferredContact}</div>
                </div>
              </div>
              <div class="field">
                <div class="label">Address:</div>
                <div class="value">${address}</div>
              </div>
            </div>
            
            <div class="section">
              <h3>Project Details</h3>
              <div class="grid">
                <div class="field">
                  <div class="label">Project Type:</div>
                  <div class="value">${projectType}</div>
                </div>
                <div class="field">
                  <div class="label">Cabinet Style:</div>
                  <div class="value">${cabinetStyle}</div>
                </div>
                <div class="field">
                  <div class="label">Finish:</div>
                  <div class="value">${finish}</div>
                </div>
                ${renovationType ? `
                <div class="field">
                  <div class="label">Renovation Type:</div>
                  <div class="value">${renovationType}</div>
                </div>
                ` : ''}
              </div>
              
              ${roomDimensions ? `
              <div class="field">
                <div class="label">Room Dimensions:</div>
                <div class="value">
                  ${roomDimensions.length} ft × ${roomDimensions.width} ft × ${roomDimensions.height} ft
                  <br><strong>Floor Area:</strong> ${estimatedArea.toFixed(1)} sq ft
                  <br><strong>Volume:</strong> ${estimatedVolume.toFixed(1)} cubic ft
                </div>
              </div>
              ` : ''}
              
              ${features && features.length > 0 ? `
              <div class="field">
                <div class="label">Additional Features:</div>
                <div class="value">
                  <ul style="margin: 5px 0; padding-left: 20px;">
                    ${features.map(feature => `<li>${feature.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>`).join('')}
                  </ul>
                </div>
              </div>
              ` : ''}
            </div>
            
            <div class="section">
              <h3>Budget & Timeline</h3>
              <div class="grid">
                <div class="field">
                  <div class="label">Budget Range:</div>
                  <div class="value">${budget} HTG</div>
                </div>
                <div class="field">
                  <div class="label">Timeline:</div>
                  <div class="value">${timeline}</div>
                </div>
              </div>
            </div>
            
            ${estimatedArea > 0 ? `
            <div class="estimate">
              <h3 style="margin-top: 0;">Preliminary Estimate</h3>
              <p><strong>Estimated Cost:</strong> ${estimatedCost.toLocaleString()} HTG (${(estimatedCost/basePricePerSqFt).toFixed(0)} HTG/sq ft)</p>
              <p style="font-size: 12px; color: #666;">
                *This is a preliminary estimate based on basic calculations. 
                Final quote will be provided after consultation and precise measurements.
              </p>
            </div>
            ` : ''}
            
            <div class="section">
              <h3>Additional Information</h3>
              <div class="field">
                <div class="label">Existing Cabinets Removal:</div>
                <div class="value">${existingCabinets ? 'Yes - Customer has existing cabinets that need removal' : 'No - New installation'}</div>
              </div>
              <div class="field">
                <div class="label">In-Home Consultation:</div>
                <div class="value">${visitRequired ? 'Yes - Customer requests in-home consultation' : 'No - Remote consultation preferred'}</div>
              </div>
              ${additionalNotes ? `
              <div class="field">
                <div class="label">Additional Notes:</div>
                <div class="value" style="white-space: pre-line;">${additionalNotes}</div>
              </div>
              ` : ''}
            </div>
            
            ${timeline === 'asap' ? `
            <div class="section urgent">
              <h3>⚡ URGENT REQUEST</h3>
              <p>Customer needs work completed as soon as possible. Priority follow-up required!</p>
            </div>
            ` : ''}
            
            <div class="section">
              <h3>Next Steps</h3>
              <ul>
                <li>Contact customer within 24 hours via ${preferredContact}</li>
                ${visitRequired ? '<li>Schedule in-home consultation</li>' : '<li>Conduct remote consultation</li>'}
                <li>Provide detailed quote with 3D renderings</li>
                <li>Discuss timeline and installation schedule</li>
              </ul>
              <p><strong>Submission Time:</strong> ${new Date().toLocaleString('fr-FR', { 
                timeZone: 'America/Port-au-Prince',
                dateStyle: 'full',
                timeStyle: 'medium'
              })}</p>
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

    // Log the submission (in production, integrate with email service and database)
    console.log('Quote request received:', {
      customer: { name, email, phone },
      project: { projectType, estimatedArea, estimatedCost },
      timeline,
      urgent: timeline === 'asap'
    })

    // Here you would integrate with your email service and database
    // Same as contact.js - integrate with SendGrid, Mailgun, and PostgreSQL

    res.status(200).json({ 
      success: true, 
      message: 'Quote request submitted successfully',
      estimatedCost,
      estimatedArea
    })

  } catch (error) {
    console.error('Quote form error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to process quote request'
    })
  }
}