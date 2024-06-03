import http from "./http-common";

class ArchivService {
  getAll() {
    return http.get("/archiv/all");
  }

  get(archivId) {
    return http.get(`/archiv/${archivId}`);
  }

  create(userId, taskName, description, dueDate, isCompleted, archivId, archivedAt) {
    return http.post(`/archiv/add?user_id=${userId}&task_name=${taskName}&description=${description}&due_date=${dueDate}&is_completed=${isCompleted}&archive_id=${archivId}&archived_at=${archivedAt}`);
  }

  update(userId, taskName, description, dueDate, isCompleted, archivId, archivedAt) {
    return http.put(`/archiv/update?user_id=${userId}&task_name=${taskName}&description=${description}&due_date=${dueDate}&is_completed=${isCompleted}&archive_id=${archivId}&archived_at=${archivedAt}`);
  }

  delete(archiveId) {
    return http.delete(`/archiv/delete?archive_id=${archiveId}`);
  }
}

export default new ArchivService();