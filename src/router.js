import { createRouter, createWebHistory } from 'vue-router'; // Correct imports for Vue Router in Vue 3
import TaskList from './components/TaskList.vue';
import TaskManagement from './components/TaskManagement.vue';
import ArchivList from './components/ArchivList.vue';
import UserList from './components/UserList.vue';
import UserManagement from './components/UserManagement.vue';
import ImpresumMussIchFalschSchreiben from './components/ImpresumMussIchFalschSchreiben.vue';

const routes = [
  { path: '/task-list', component: TaskList },
  { path: '/task-management', component: TaskManagement },
  { path: '/archiv-list', component: ArchivList },
  { path: '/user-list', component: UserList },
  { path: '/user-management', component: UserManagement },
  { path: '/ImpresumMussIchFalschSchreiben', component: ImpresumMussIchFalschSchreiben}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
