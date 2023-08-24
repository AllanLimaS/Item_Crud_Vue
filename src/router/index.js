import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import TableView from '../views/TableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: FormView
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    }
  ]
})

export default router
