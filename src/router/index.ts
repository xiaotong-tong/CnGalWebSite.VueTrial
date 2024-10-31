import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

let routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Common",
		component: () => import("../pages/home.vue"),
		children: [
			{
				path: "/",
				name: "home",
				component: () => import("../pages/home/home.vue")
			}
		]
	}
];

console.log(import.meta.env.BASE_URL);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
	// 在切换页面时，滚动到顶部
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return {
				top: 0,
				behavior: "smooth"
			};
		}
	}
});

export default router;
