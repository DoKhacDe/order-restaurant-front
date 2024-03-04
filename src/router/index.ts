// @ts-ignore
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import("@/components/layouts/Dashboard.vue"),
        children: [
            {
                path: "/",
                name:"step",
                component: () => import("@/views/AboutView.vue")
            },
            {
                path: "/order-completed",
                name:"order-completed",
                component: () => import("@/views/OrderCompleted.vue")
            },
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import("@/components/layouts/Admin.vue"),
        children: [
            {
                path: "/admin",
                name:"list-order",
                component: () => import("@/views/admin/ListOrder.vue")
            },
            {
                path: "/admin/detail-order/:id",
                name:"detail-order",
                component: () => import("@/views/admin/_id.vue")
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// @ts-ignore
export default router
