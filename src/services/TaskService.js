import http from "./http-common";

class TaskService {
  getAll() {
    return http.get("/task/all");
  }

  get(id) {
    return http.get(`/task/${id}`);
  }

  create(user_id, taskName, description, dueDate) {
    return http.post(`task/add?user=${user_id}&task_name=${taskName}&description=${description}&due_date=${dueDate}&is_completed=False&task_id=0`);
  }

  update(id, taskName, description, dueDate, isCompleted) {
    return http.put(`task/update?user_id=${id}&task_name=${taskName}&description=${description}&due_date=${dueDate}&is_completed=${isCompleted}&task_id=0`);
  }

  delete(TaskId) {
    return http.delete(`/task/delete?task_id${TaskId}`);
  }
}

export default new TaskService();