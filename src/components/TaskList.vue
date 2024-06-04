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
              <v-card-title>
                {{ task.taskName }}
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="editTask(task)">Edit</v-btn>
              </v-card-title>
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

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title>
              <span>Edit Task</span>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="updateTask">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editTaskData.taskName" label="Task Name" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editTaskData.description" label="Description" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="editTaskData.dueDate" label="Due Date" type="datetime-local" required></v-text-field>
                  </v-col>
                </v-row>
                <v-checkbox v-model="editTaskData.isCompleted" label="←Change Completion Status" class="visible checkbox"></v-checkbox>
                <v-btn type="submit" color="primary">Update Task</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
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
      dialog: false,
      editTaskData: {
        taskId: "",
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
        console.error(error);
      }
    },
    formatDate(date) {
      return format(new Date(date), "dd.MM.yyyy - HH:mm");
    },
    editTask(task) {
      this.editTaskData = { ...task };
      this.dialog = true;
    },
    async updateTask() {
      try {
        await TaskService.update(
          this.editTaskData.taskId,
          this.editTaskData.taskName,
          this.editTaskData.description,
          this.editTaskData.dueDate,
          this.editTaskData.isCompleted
        );
        console.log("Task updated:", this.editTaskData);
        this.dialog = false;
        this.retrieveTasks();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }
};
</script>

<style scoped>
.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}
.visible-checkbox {
  visibility: visible !important;
  opacity: 1 !important;
  color: currentColor;
  border-style: solid;
}
.visible-checkbox .v-input--selection-controls__input {
  display: block;
  border: 2px solid #000;
  border-radius: 4px;
}
.visible-checkbox .v-input--selection-controls__ripple {
  color: #000;
}
</style>