import Vue from "vue";
import Router from "vue-router";
import BoardView from "@/page/BoardView";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "BoardView",
      component: BoardView
    }
  ]
});
