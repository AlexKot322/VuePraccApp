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
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once("value")
          ).val() || {};
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit("setError", e);
        throw Error(e);
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch("getUid");
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once("value")
          ).val() || {};
        return { ...record, id };
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
