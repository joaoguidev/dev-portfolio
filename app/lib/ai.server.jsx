/**
 * Generate embeddings using an AI service.
 * @param {Object} sendData - The data to be sent for embedding generation.
 * @param {Object} context - The context object containing environment variables.
 * @returns {Promise<Object>} - A promise that resolves with the generated embeddings.
 * @throws {Error} - If there's an error generating embeddings.
 */
export async function generateEmbeddingAi(sendData, context) {
   try {
      const API_SEARCH_EMBADDING_ROUTE_SECRET = { API_SEARCH_EMBADDING_ROUTE_SECRET: context.cloudflare.env.API_SEARCH_EMBADDING_ROUTE_SECRET }
      const queryString = new URLSearchParams(API_SEARCH_EMBADDING_ROUTE_SECRET ).toString()
      const url = `${context.cloudflare.env.PROJECT_URL}/resource/embeddings/search?${queryString}`
      const requestOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            data: sendData,
         }),
      }
      const aIresponse = await fetch(url, requestOptions)
      if (aIresponse.status !== 200) {
         throw new Error("Error generating embeddings")
      }
      const data = await aIresponse.json()
      return data
   } catch (error) {
      console.log(error)
      throw new Error("Error generating embeddings")
   }
}

