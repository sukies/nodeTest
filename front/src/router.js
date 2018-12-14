import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import Upload from "./views/Upload.vue";
import Edit from "./views/Edit.vue";
import Add from "./views/AddIcon.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/upload",
      name: "upload",
      component: Upload
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit
    },
    {
      path: "/add",
      name: "add",
      component: Add
    }
  ]
});
