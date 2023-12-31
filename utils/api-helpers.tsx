export async function fetchPostJSON(url: string, data?: {}) {
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data || {}),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Handle 404 error (Not Found) differently, e.g., log it
        console.error("Resource not found:", url);
        // You can also return a specific value or throw a custom error for 404
        return null; // or throw new NotFoundError('Resource not found');
      } else if (
        response.headers.get("content-type")?.includes("application/json")
      ) {
        // If the response has JSON content type, parse and return JSON
        return await response.json();
      } else {
        // If the response is not JSON, handle it accordingly
        console.error("Response is not JSON:", response);
        throw new Error("Response is not JSON");
      }
    }

    return await response.json();
  } catch (error) {
    // Handle other errors
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}
