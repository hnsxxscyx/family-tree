import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

// const findNodeById = (id, tree) => {
//   // 有无mate
//   let matchedNode = undefined;
//   for (let node of tree.children) {
//     if (node.id === id) {
//       matchedNode = node;
//       break;
//     } else {
//       matchedNode = findNodeById(id, node.children);
//       if (matchedNode) {
//         break;
//       }
//     }
//   }
//   return matchedNode;
// };

export default new Vuex.Store({
  state: {
    allFamilyInfo: {},
    activeKey: "",
    activePeopleInfo: {},
    treeFamilyInfo: {}
  },
  getters: {
    activeFamilyInfo(state) {
      let list = state.allFamilyInfo[state.activeKey] || [];
      return list;
    }
  },
  mutations: {
    updateActiveKey(state, key) {
      state.activeKey = key;
    },
    newFamily(state, key) {
      const { allFamilyInfo } = state;
      if (!Array.isArray(allFamilyInfo[key])) {
        state.allFamilyInfo[key] = [];
        state.treeFamilyInfo[key] = {
          name: key,
          children: []
        };
      }
      state.activeKey = key;
    },
    updatePeopleInfo(state, info) {
      const { id } = info;
      if (id) {
        // 数据量过大肯定不行了，不过这个量级基本不在考虑范围之内
        let activeInfo = state.allFamilyInfo[state.activeKey];
        const activeIndex = activeInfo.findIndex(item => item.id === id);
        activeInfo.splice(activeIndex, 1, info);
      }
    },
    deletePeopleInfo(state, info) {
      const { id } = info;
      if (id) {
        let activeInfo = state.allFamilyInfo[state.activeKey];
        const activeIndex = activeInfo.findIndex(item => item.id === id);
        activeInfo.splice(activeIndex, 1);
      }
    },
    createPeopleInfo(state, info) {
      const activeInfo = state.allFamilyInfo[state.activeKey];
      const activeInfoLength = activeInfo.length;
      // 没可能超出数值范围

      const id = (() => {
        // 从0开始组件中给出的值总是undefined，也不知道是element的锅还是vue的，感觉vue的更大些
        let id = 1;
        if (activeInfoLength === 0) {
        } else {
          id = parseInt(activeInfo[activeInfoLength - 1].id) + 1;
        }
        return id;
      })();
      const newInfo = {
        ...info,
        id
      };
      activeInfo.push(newInfo);

      // const falimyTree = state.treeFamilyInfo[state.activeKey]
      // if (info.fatherId || info.motherId) {

      // } else {
      //   falimyTree.push()
      // }
      // const findParent =
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin]
});
