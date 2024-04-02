import sanitizeHtml from 'sanitize-html';
/**
 * Sanitize a string input by removing HTML tags and attributes.
 * @param {string} input - The input string to be sanitized.
 * @returns {Promise<string>} - A promise that resolves with the sanitized string.
 */
export async function sanitizeString(input) {
  return sanitizeHtml(input, {
    allowedTags: [], // Don't allow any tags
    allowedAttributes: {}, // Don't allow any attributes
  });
}

