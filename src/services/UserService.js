import http from "./http-common";

class UserService {
  getAll() {
    return http.get("/user/all");  // Ensure this matches your endpoint
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

 async create(data) {
    try {
      // Check if the username already exists
      const existingUser = await this.getUserByUsername(data.username);
      if (existingUser) {
        throw new Error("Username already exists.");
      }

    const { name, password } = data;
    return http.post(`/user/add?username=${name}&password=${password}&user_id=0`);
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const response = await http.get(`/user/by-username/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user by username:", error);
      return null;
    }
  }

  update(id, name, password) {
    return http.put(`/user/update?user_id=${id}&username=${name}&password=${password}`)
    //return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/delete?user_id=${id}`);
  }
}

export default new UserService();