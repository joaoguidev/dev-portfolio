export async function generateEmbeddingAi(sendData, context) {
   try {
      const API_GENERETE_EMBADDING_ROUTE_SECRET = { API_GENERETE_EMBADDING_ROUTE_SECRET: context.cloudflare.env.API_GENERETE_EMBADDING_ROUTE_SECRET }
      const queryString = new URLSearchParams(API_GENERETE_EMBADDING_ROUTE_SECRET ).toString()
      const url = `${context.cloudflare.env.PROJECT_URL}/resource/embeddings?${queryString}`
      const requestOptions = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            data: sendData,
         }),
      }
      const response = await fetch(url, requestOptions)
      if (response.status !== 200) {
         throw new Error("Error generating embeddings")
      }
      const data = await response.json()
      console.log('RESSSSSSSSSSSSSSSSSSS', data );
      return data
   } catch (error) {
      console.log(error)
      throw new Error("Error generating embeddings")
   }
}