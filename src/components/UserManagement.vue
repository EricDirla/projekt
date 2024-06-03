<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- User creation form -->
        <v-card class="pa-4 mb-4">
          <v-card-title>
            <h2>Create User</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form @submit.prevent="createUser">
              <v-text-field
                label="Username"
                v-model="newUser.name"
                required
                class="mb-4"
              ></v-text-field>
              <v-text-field
                label="Password"
                v-model="newUser.password"
                type="password"
                required
                class="mb-4"
              ></v-text-field>
              <v-btn type="submit" color="primary">Create User</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- User list -->
        <v-card class="pa-4">
          <v-card-title>
            <h2>User List</h2>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="user in users" :key="user.id" class="my-2">
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  <strong>ID:</strong> {{ user.id }} - <strong>Password:</strong> {{ user.password }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
  import UserService from "../services/UserService";
  
  export default {
    data() {
      return {
        users: [],
        newUser: {
          name: "",
          password: ""
        }
      };
    },
    created() {
      this.retrieveUsers();
    },
    methods: {
      async retrieveUsers() {
        try {
          const response = await UserService.getAll();
          this.users = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async createUser() {
        try {
          const response = await UserService.create(this.newUser);
          console.log("User created:", response.data);
          this.newUser.name = "";
          this.newUser.password = "";
          this.retrieveUsers(); // Refresh the user list after creation
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
      // Add methods for updating and deleting users if needed
    }
  };
  </script>
  
  <style scoped>
  .v-list-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>