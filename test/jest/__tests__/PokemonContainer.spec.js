import { mount, createLocalVue, shallowMount } from "@vue/test-utils";
import PokemonContainer from "../../../src/components/PokemonContainer.vue";
import VueRouter from "vue-router";

// Quasar imports
import { mountQuasar } from "@quasar/quasar-app-extension-testing-unit-jest";
import {
  QInfiniteScroll,
  QCard,
  QCardSection,
  QIcon,
  QSpinnerDots
} from "quasar";

import apiResponse from "../__mocks__/apiResponse";

const components = {
  QInfiniteScroll,
  QCard,
  QCardSection,
  QIcon,
  QSpinnerDots
};

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

// Mocking fetch API function
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(apiResponse)
  })
);

afterEach(() => {
  fetch.mockClear();
});

// Component test suite
describe("PokemonContainer", () => {
  const wrapper = mountQuasar(PokemonContainer, {
    mount: {
      type: "full",
      localVue,
      router
    },
    quasar: {
      components: components
    }
  });

  it("renders 20 pokemon on page load", async () => {
    // Wait for pokemon to be rendered to the DOM
    await wrapper.vm.$nextTick();

    // Getting cards
    const pokemonCards = wrapper.findAll("[data-testid='pokemonCard']");

    // expect(wrapper.html()).toMatchSnapshot();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(pokemonCards).toHaveLength(20);
  });

  it("loads correct route on pokemon card click", async () => {
    // Wait for pokemon to be rendered to the DOM
    await wrapper.vm.$nextTick();

    // Getting cards
    const pokemonCards = wrapper.findAll("[data-testid='pokemonCard']");

    // Testing on first pokemon
    const firstPokemon = pokemonCards.at(0);
    const firstPokemonName = firstPokemon.find("div").text();

    firstPokemon.trigger("click");
    expect(wrapper.vm.$route.path).toEqual(
      `/pokedex/${firstPokemonName.toLowerCase()}`
    );
  });
});
