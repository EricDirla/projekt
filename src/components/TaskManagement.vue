<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Task creation form -->
        <v-card class="pa-4">
          <v-card-title>
            <h2>Create Task</h2>
          </v-card-title>
          <v-form @submit.prevent="createTask">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newTask.userId" label="User ID" type="number" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newTask.taskName" label="Task Name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newTask.description" label="Description" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="newTask.dueDate" label="Due Date" type="datetime-local" required></v-text-field>
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary">Create Task</v-btn>
          </v-form>
        </v-card>
        
        <!-- Task list -->
        <v-card class="pa-4">
          <v-card-title>
            <h1>Task List</h1>
          </v-card-title>
          <v-divider></v-divider>
          <v-list>
            <v-card v-for="task in tasks" :key="task.task_id" class="my-2">
              <v-card-title>{{ task.taskName }}</v-card-title>
              <v-card-text>
                <strong>Description:</strong> {{ task.description }}<br>
                <strong>Due Date:</strong> {{ formatDate(task.dueDate) }}<br>
                <strong>Completed:</strong> {{ task.isCompleted ? 'Yes' : 'No' }}<br>
                <strong>Worked on by:</strong> {{ task.user.name }}<br>
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
        newTask: {
          userId: "",
          taskName: "",
          description: "",
          dueDate: "",
          isCompleted: false
        }
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
          console.error("Error fetching tasks:", error);
        }
      },
      async createTask() {
        try {
          const response = await TaskService.create(this.newTask.userId, this.newTask.taskName, this.newTask.description, this.newTask.dueDate, this.newTask.isCompleted);
          console.log("Task created:", response.data);
          this.newTask = {
            userId: "",
            taskName: "",
            description: "",
            dueDate: "",
            isCompleted: false
          };
          this.retrieveTasks(); // Refresh the task list after creation
        } catch (error) {
          console.error("Error creating task:", error);
        }
      },
      formatDate(date) {
      return format(new Date(date), 'dd.MM.yyyy - HH:mm');
    }
    }
  };
  </script>
  
  <style>
  /* Your component styles go here */
  </style>
  