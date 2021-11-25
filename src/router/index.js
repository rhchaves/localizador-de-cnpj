import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FormCNPJ from "../components/FormCNPJ.vue";

Vue.use(VueRouter);
const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/list",
        name: "List",
        component: () =>
            import ("../views/List.vue"),
        children: [{
            path: "/formCnpj",
            component: FormCNPJ,
        }, ],
    },
    {
        path: "/search",
        name: "Search",
        component: () =>
            import ("../views/Search.vue"),
    },
    {
        path: "/details/:cnpj",
        name: "Details",
        component: () =>
            import ("../views/Details.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// Obs.: Arquivo ignorado no eslint
// "eslintIgnore": ["index.js"]

export default router;
