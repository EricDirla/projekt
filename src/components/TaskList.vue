<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-4">
          <v-card-title>
            <h1>Task List</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-card v-for="task in tasks" :key="task.task_id" class="my-2">
              <v-card-title>{{ task.taskName }}</v-card-title>
              <v-card-text>
                <strong>Description:</strong> {{ task.description }}<br />
                <strong>Due Date:</strong> {{ formatDate(task.dueDate) }}<br />
                <strong>Completed:</strong> {{ task.isCompleted ? "Yes" : "No"
                }}<br />
                <strong>Worked on by:</strong> {{ task.user.name }}<br />
                <strong>ID:</strong> {{ task.taskId }}
              </v-card-text>
            </v-card>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TaskService from "../services/TaskService";
import { format } from "date-fns";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.retrieveTasks();
  },
  methods: {
    async retrieveTasks() {
      try {
        const response = await TaskService.getAll();
        this.tasks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      return format(new Date(date), "dd.MM.yyyy - HH:mm");
    },
  },
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}
</style>
