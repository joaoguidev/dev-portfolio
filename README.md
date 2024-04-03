# Welcome to dev portfolio
This portfolio is designed with security as the top priority, utilizing various technologies and best practices to ensure a safe and reliable experience for users.

### Technologies Used:

- **Remix**: Provides a solid foundation for building web applications with a focus on performance and developer experience.
- **Supabase**: PostgreSQL open-source alternative to Firebase. It is scalable, secure and also offers auth solutions.
- **openAi API**: Embedding generation using OpenAI's "text-embedding-3-small" model. Enabling semantic context with "GPT-3.5-turbo" and pgVector makes it possible to perform similarity searches in a PostgreSQL databases (Supabase) using embeddings.
- **pgVector**: Open-source vector similarity search tool for PostgreSQL databases.
- **Sentry**: Ensures robust error tracking and monitoring, allowing for quick identification and resolution of issues.
- **Zod**: Implements input validation for data integrity and security.
- **Sanitize-html**: Enforces sanitization to prevent XSS (Cross-Site Scripting) attacks and code injections.
- **Turnstile**: Cloudflare's CAPTCHA alternative for enhanced form security.
- **Nonce**: To prevent unauthorized scripts or stylesheets from being injected and executed, only scripts or stylesheets with matching nonces are executed or applied.
- **CSRF protection**: Implemented token-based protection with a uniquely generated random code on each request to protect against third-party servers making requests.
- **OWASP Best Practices**: Adheres to OWASP recommendations for setting security headers and achieving an A+ grade on Mozilla Observatory
- **Cloudflare Web Application Firewall (WAF)**: For additional layers of security.
- **Cloudflare and Cloudflare Pages**: Provides enhanced website performance, security, and scalability through robust content delivery and efficient deployment infrastructure.

Test https://joaodev.work on [ Mozilla Observatory -> ](https://observatory.mozilla.org/)

![image](https://github.com/joaoguidev/dev-portfolio/assets/63625334/932ebb7c-a51b-43a0-9210-aebad2629022)

### Additional Implementations:

- **Brevo-API Integration**: Integrates with Brevo-API to handle sending and receiving emails, enhancing communication capabilities through the contact form.

### Test the Application:

You can test the application live by visiting [joaodev.work](https://joaodev.work). Experience the secure and efficient developer portfolio firsthand!

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
