import { createRouter, createWebHistory } from 'vue-router'
import TableroView from '../views/TableroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tablero',
      component: TableroView,
    },

  ],
})

export default router
