import sanitizeHtml from 'sanitize-html';

export async function sanitizeString(input) {
  return sanitizeHtml(input, {
    allowedTags: [], // Don't allow any tags
    allowedAttributes: {}, // Don't allow any attributes
  });
}
// import { JSDOM } from 'jsdom';
// import DOMPurify from "dompurify"

// export async function sanitizeString(input) {
//    const window = new JSDOM("").window
//    const purify = DOMPurify(window);
//    return purify.sanitize(input, { USE_PROFILES: { html: false } })
// }
