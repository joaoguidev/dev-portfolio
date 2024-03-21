export async function sendTransactionalEmail(context, clientName, emailTo, userSentMessage) {
   context.cloudflare.env
   const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "api-key": `${context.cloudflare.env.BREVO_API_KEY}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         sender: {
            name: "Joao Dantas - Contact",
            email: `${context.cloudflare.env.BRANDED_EMAIL}`,
         },
         to: [
            {
               email: `${emailTo}`,
               name: `Joao Dantas - Contact`,
            },
         ],
         bcc: [
            {
               email: `${context.cloudflare.env.BRANDED_EMAIL}`,
               name: `Joao Dantas - Portfolio`,
            },
            {
               email: `${context.cloudflare.env.ALTERNATIVE_EMAIL}`,
               name: `Joao Dantas - Portfolio`,
            },
         ],
         replyTo: { email: `${context.cloudflare.env.BRANDED_EMAIL}`, name: "Joao Dantas" },
         subject: `Thank You for Getting in Touch!`,
         htmlContent: `
           <html>
           <head>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   margin: 0;
                   padding: 0;
                   background-color: #f7f7f7;
               }
               .container {
                   max-width: 600px;
                   margin: 20px auto;
                   background-color: #ffffff;
                   padding: 20px;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               h1 {
                   color: #333333;
                   text-align: center;
               }
               p {
                   color: #666666;
                   line-height: 1.6;
                   margin-bottom: 20px;
               }
               .signature {
                   text-align: center;
                   margin-top: 20px;
               }
               .messageSent {
                  background-color: #f0f0f0;
                  border-radius: 8px;
                  padding: 15px;
                  margin-top: 20px;
              }
              .messageSent p {
                  color: #333333;
                  margin: 0;
              }
           </style>
           </head>
           <body>
               <div class="container">
                   <h1>Thank You for Getting in Touch!</h1>
                   <p>Hi ${clientName},</p>
                   <p>Thank you for reaching out and expressing interest in my work. I truly appreciate the time you've taken to connect with me.</p>
                   <p>I will review your message and get back to you as soon as possible.</p>
                   <p>Looking forward to the opportunity to discuss further!</p>
                   <div class="signature">
                       <p>Best Regards,</p>
                       <p>Joao Dantas</p>
                   </div>
                   <div class="messageSent">
                   <p>Your Message</p>
                   ${userSentMessage}
               </div>
               </div>
           </body>
           </html>`,
      }),
   })

   const data = await response.json()
   return data
}
