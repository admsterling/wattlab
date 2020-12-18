const state = () => ({
  prof: {},
});

const getters = {
//   cartProducts: (state, getters, rootState) => {
//     return state.items.map(({ id, quantity }) => {
//       const product = rootState.products.all.find(
//         (product) => product.id === id
//       );
//       return {
//         title: product.title,
//         price: product.price,
//         quantity,
//       };
//     });
//   },
};

const actions = {
//   checkout({ commit, state }, products) {
//     const savedCartItems = [...state.items];
//     commit('setCheckoutStatus', null);
//     // empty cart
//     commit('setCartItems', { items: [] });
//     shop.buyProducts(
//       products,
//       () => commit('setCheckoutStatus', 'successful'),
//       () => {
//         commit('setCheckoutStatus', 'failed');
//         // rollback to the cart saved before sending the request
//         commit('setCartItems', { items: savedCartItems });
//       }
//     );
//   },
};

const mutations = {
//   pushProductToCart(state, { id }) {
//     state.items.push({
//       id,
//       quantity: 1,
//     });
//   },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
