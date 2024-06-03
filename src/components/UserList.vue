<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>
            <h1>User List</h1>
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
      users: []
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
    }
  }
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>