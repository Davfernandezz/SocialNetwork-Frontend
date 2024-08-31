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
        console.error("Error creating post:", error);
        throw error;
    }
};

export const getAllPosts = async (token) => {
    try {
        const response = await fetch(`${URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json()
    } catch (error) {
        console.error("Error getting posts:", error);
        throw error;
    }
}

export const deletePostById = async (token, id) => {
    try {
        const response = await fetch(`${URL}/${id}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

  export const getMyPosts = async (token) => {
    try {
        const response = await fetch(`${URL}/own`, {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        return await response.json()
    } catch (error) {
        console.error("Error getting my posts:", error);
        throw error;
    }
}

export const updatePosts = async (id, data, token) => {
    try {
        const response = await fetch(`${URL}/own/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });
        return await response.json()
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}

export const putLikeById = async (id, token) => {
    try {
        const response = await fetch(`${URL}/like/${id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

export const getPostById = async (id, token) => {
    try {
        const response = await fetch(`${URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting posts:", error);
        throw error;
    }
}
