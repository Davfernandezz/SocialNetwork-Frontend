const URL = 'http://localhost:5000/api/posts';

//POSTS

export const createPost = async (data, token) => {
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
          return await response.json();
    } catch (error) {
        console.error("User register error:", error);
        throw error;
    }
};