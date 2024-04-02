/**
 * Validate form data against a schema.
 * @param {Object} schema - The schema object used for validation.
 * @param {Object} dirtyFormData - The form data to be validated.
 * @returns {Promise<Object>} - A promise that resolves with the validation result.
 * @throws {Response} - If either schema or form data is missing.
 */
export async function validateSchema(schema, dirtyFormData) {
   if (!schema || !dirtyFormData) {
      throw new Response("Parameter Missing", { status: 404 })
   }
   try {
      const cleanData = await schema.parse(dirtyFormData)
      return { success: true, cleanData: cleanData }
   } catch (error) {
      if (error.issues && Array.isArray(error.issues)) {
         const formErrors = error.issues.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message
            return acc
         }, {})
         return { success: false, errors: formErrors }
      } else {
         // If issues array is not present or not an array, handle it differently
         return { success: false, errors: { unknown: "An unknown validation error occurred." } }
      }
   }
}
