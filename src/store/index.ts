import Icoords from "@/interfaces/coords";
import { createStore } from "vuex";
import zipOrNav from "../enums/zipOrNav";

export default createStore({
  state: {
    navCoords: null as Icoords | null,
    zipCoords: null as Icoords | null,
    selectedLocation: zipOrNav.Nav as zipOrNav,
    showLocationModal: false as boolean,
  },
  getters: {},
  mutations: {
    setNavCoords(state, coords: Icoords) {
      state.navCoords = coords;
    },

    setZipCoords(state, coords: Icoords) {
      state.zipCoords = coords;
    },

    setSelectedLocation(state, location: zipOrNav) {
      if (location === "ZIP") state.selectedLocation = zipOrNav.Zip;
      if (location === "NAV") state.selectedLocation = zipOrNav.Nav;
    },

    setShowLocationModal(state, show: boolean) {
      state.showLocationModal = show;
    },
  },
  actions: {},
  modules: {},
});
