import firebase from "firebase/compat/app";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch("getUid");
        return await firebase
          .database()
          .ref(`users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit("setError", e);
        throw Error(e);
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
