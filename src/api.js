const API_URL = 'http://localhost:5000/api';

/** =================== USER MANAGEMENT =================== **/
// Fungsi untuk mendaftarkan pengguna (REGISTER)
export const registerUser = async(userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

// Fungsi untuk login pengguna (LOGIN)
export const loginUser = async(userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    return response.json();
};

// Fungsi untuk mendapatkan profil pengguna (READ)
export const getUserProfile = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/profile/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error(`Gagal mengambil profil pengguna, status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Fungsi untuk membuat profil baru (CREATE)
export const createUserProfile = async(profileData) => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        });
        if (!response.ok) {
            throw new Error('Failed to create user profile');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};

// Fungsi untuk mengupdate profil pengguna (UPDATE)
export const updateUserProfile = async(userId, profileData) => {
    try {
        const response = await fetch(`${API_URL}/profile/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profileData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user profile');
        }
        return response.json();
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

// Fungsi untuk menghapus profil pengguna (DELETE)
export const deleteUserProfile = async(userId) => {
    try {
        const response = await fetch(`${API_URL}/profile/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to delete user profile');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting user profile:', error);
        throw error;
    }
};

/** =================== BLOG MANAGEMENT =================== **/

// Fungsi untuk mendapatkan semua blog (READ ALL)
export const getAllBlogs = async() => {
    try {
        const response = await fetch(`${API_URL}/blogs`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

// Fungsi untuk mendapatkan blog berdasarkan ID (READ ONE)
export const getBlogById = async(blogId) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${blogId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch the blog');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching the blog:', error);
        throw error;
    }
};

// Fungsi untuk membuat blog baru (CREATE)
export const createBlog = async(blogData) => {
    try {
        const response = await fetch(`${API_URL}/blogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });
        if (!response.ok) {
            throw new Error('Failed to create blog');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};

// Fungsi untuk mengupdate blog (UPDATE)
export const updateBlog = async(blogId, blogData) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${blogId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blogData)
        });
        if (!response.ok) {
            throw new Error('Failed to update blog');
        }
        return response.json();
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};

// Fungsi untuk menghapus blog (DELETE)
export const deleteBlog = async(blogId) => {
    try {
        const response = await fetch(`${API_URL}/blogs/${blogId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }
        return response.json();
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};