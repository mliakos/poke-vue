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
        component: () => import("components/PokemonDetails.vue")
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
