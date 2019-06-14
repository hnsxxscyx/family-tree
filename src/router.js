import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index/Index.vue";
import FamilyTree from "./views/FamilyTree/FamilyTree";
import FamilyManage from "./views/FamilyManage/FamilyManage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    },
    {
      path: "/familyTree",
      name: "familyTree",
      component: FamilyTree
    },
    {
      path: "/familyManage",
      name: "FamilyManage",
      component: FamilyManage
    },
  ]
});
