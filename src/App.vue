<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-btn to="/">Home</v-btn>
      <v-btn to="/task-list">Task List</v-btn>
      <v-btn to="/task-management">Task Management</v-btn>
      <v-btn to="/archiv-list">Archiv List</v-btn>
      <v-btn to="/user-list">User List</v-btn>
      <v-btn to="/user-management">User Management</v-btn>
    </v-app-bar>
    <div class="content">
      <v-container>
        <router-view></router-view>
      </v-container>
    </div>
    <v-bottom-navigation fixed app color="grey darken-3">
      <v-btn to="/ImpresumMussIchFalschSchreiben">Impressum</v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.content {
  margin-top: 20px;
}
</style>