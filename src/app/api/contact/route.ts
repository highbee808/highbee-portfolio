import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { name, email, projectType, budget, message } = await req.json()

    // Validate required fields
    if (!name || !email || !projectType || !budget || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // If Resend is not configured, just log and return success
    if (!process.env.RESEND_API_KEY) {
      console.log('Contact form submission (Resend not configured):', {
        name,
        email,
        projectType,
        budget,
        message,
      })
      return Response.json({ success: true })
    }

    // Send email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Highbee Agency <hello@highbee.dev>',
      to: process.env.CONTACT_EMAIL || 'hello@highbee.dev',
      replyTo: email,
      subject: `New Portfolio Inquiry: ${projectType} from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
              .field { margin-bottom: 16px; }
              .label { font-weight: 600; color: #6b7280; font-size: 12px; text-transform: uppercase; }
              .value { margin-top: 4px; }
              .message-box { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 24px;">New Portfolio Inquiry</h1>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Someone wants to work with you!</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Project Type</div>
                  <div class="value">${projectType}</div>
                </div>
                <div class="field">
                  <div class="label">Budget Range</div>
                  <div class="value">${budget}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
