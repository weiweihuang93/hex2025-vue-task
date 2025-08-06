import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Week1 from '../views/Week1.vue'
import Week2 from '../views/Week2.vue'
import Week3 from '../views/Week3.vue'
import TodoSignUp from '@/views/TodoSignUp.vue'
import TodoLogin from '@/views/TodoLogin.vue'
import TodoList from '@/views/TodoList.vue'
import TodoJS from '@/views/TodoJS.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/week1',
      component: Week1,
    },
    {
      path: '/week2',
      component: Week2,
    },
    {
      path: '/week3',
      component: Week3,
    },
    {
      path: '/final',
      children: [
        {
          path: 'signup',
          component: TodoSignUp,
        },
        {
          path: 'login',
          component: TodoLogin,
        },
        {
          path: 'todo',
          component: TodoList,
        },
      ],
    },
    {
      path: '/final-todo',
      component: TodoJS,
    },
  ],
})

export default router
