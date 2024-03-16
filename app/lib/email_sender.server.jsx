export async function sendTransactionalEmail(context, emailTo, testDone, testMarked) {
   const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
         Accept: "application/json",
         "api-key": `${context.env.BREVO_API_KEY}`,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         sender: {
            name: "Maple Road - English Test Submitted",
            email: "info@maple-road.ca",
         },
         to: [
            {
               email: `${emailTo}`,
               name: `Maple Road - English Test Submitted`,
            },
         ],
         subject: `English Test Submitted - ${testDone.full_name} - Maple Road`,
         htmlContent: generateHTMLContent(testMarked, testDone.full_name, testDone.email),
      }),
   })

   const data = await response.json()
   console.log("data", data)
   return data
}

// Function to generate HTML content
function generateHTMLContent(testMarked, customerName, customerEmail) {
   const calculateScore = () => {
      const totalQuestions = testMarked.length
      const correctAnswers = testMarked.filter((result) => result.mark).length
      return ((correctAnswers / totalQuestions) * 100).toFixed(2)
   }

   return `
   <html>
   <head>
     <style>
       body {
         font-family: 'Arial', sans-serif;
         margin: 0;
         padding: 0;
         background-color: #f7f7f7;
       }

       .container {
         max-width: 800px;
         margin: 20px auto;
         background-color: #ffffff;
         padding: 20px;
         border-radius: 8px;
         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }

       h2 {
         color: #333;
       }

       p {
         color: #555;
         margin-bottom: 15px;
       }

       table {
         width: 100%;
         border-collapse: collapse;
         margin-top: 20px;
       }

       th, td {
         border: 1px solid #ddd;
         padding: 12px;
         text-align: left;
       }

       th {
         background-color: #f2f2f2;
       }

       td {
         color: #333;
       }

       .ok {
         color: green;
       }

       .fail {
         color: orange;
       }
     </style>
   </head>
   <body>
     <div class="container">
       <h2>English Test Results</h2>
       <p>
         Customer: ${customerName}<br>
         Email: ${customerEmail}<br>
         Score: ${calculateScore()}%
       </p>
       <table>
         <thead>
           <tr>
             <th>Question</th>
             <th>Correct Answer</th>
             <th>Answered</th>
             <th>Result</th>
           </tr>
         </thead>
         <tbody>
           ${testMarked
              .map(
                 (result) => `
             <tr key=${result.id}>
               <td>${result.question.subheading.slice(0, 50)}</td>
               <td>${result.correct_answer}</td>
               <td>${result.answered_question}</td>
               <td class="${result.mark ? "ok" : "fail"}">${result.mark ? "OK" : "Fail"}</td>
             </tr>
           `,
              )
              .join("")}
         </tbody>
       </table>
     </div>
   </body>
 </html>
   `
}
