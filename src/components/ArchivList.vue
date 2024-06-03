<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Archive list -->
        <v-card class="pa-4">
          <v-card-title>
            <h1>Archive List</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="archiv in archives" :key="archiv.archivId" class="my-2">
              <v-card class="pa-3" outlined>
                <v-card-title>{{ archiv.taskName }}</v-card-title>
                <v-card-text>
                  <div><strong>Description:</strong> {{ archiv.description }}</div>
                  <div><strong>Due Date:</strong> {{ formatDate(archiv.dueDate) }}</div>
                  <div><strong>Completed:</strong> {{ archiv.isCompleted ? 'Yes' : 'No' }}</div>
                  <div><strong>Task-ID:</strong> {{ archiv.taskId }}</div>
                  <div><strong>ID:</strong> {{ archiv.archivId }}</div>
                  <div><strong>Archived At:</strong> {{ formatDate(archiv.archivedAt) }}</div>
                  <div><strong>User-ID:</strong> {{ archiv.userId }}</div>
                </v-card-text>
              </v-card>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { format } from 'date-fns';
import ArchivService from "../services/ArchivService";

export default {
  data() {
    return {
      archives: []
    };
  },
  created() {
    this.retrieveArchives();
  },
  methods: {
    async retrieveArchives() {
      try {
        const response = await ArchivService.getAll();
        this.archives = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd.MM.yyyy - HH:mm');
    }
  }
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>