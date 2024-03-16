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
