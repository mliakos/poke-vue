const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "pokedex", component: () => import("pages/Pokedex.vue") },
      {
        path: "pokedex/:pokemonName",
        redirect: "pokedex/:pokemonName/about"
      },
      {
        path: "pokedex/:pokemonName/:activeLink",
        component: () => import("pages/Pokemon.vue"),

        // Using this meta prop to force Vue to re-render the component (used when wanting to switch pokemon from another pokemon's profile)
        meta: { reuse: false }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
