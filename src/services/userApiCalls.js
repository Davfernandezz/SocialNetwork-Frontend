const URL = 'http://localhost:5000/api/users'

//USERS

export const getUserProfile = async (token) => {
    try {
        const response = await fetch(`${URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return await response.json()
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}