import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/quiz',
        name: 'Quiz',
        component: () => import('../views/Quiz.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/character-profiles',
        name: 'CharacterProfiles',
        component: () => import('../views/CharacterProfiles.vue')
    }
]

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})