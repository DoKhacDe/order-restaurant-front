import {GetterTree, ActionTree, MutationTree, Module} from 'vuex';


// action types
export const GET_STEP = "get-step";

// mutation types
export const SET_STEP = "setStep";
export const SET_IS_NEXT = "SET_IS_NEXT";


export const state = () => ({
    step: {} as any,
    isNext: false,
})

type RootState = ReturnType<typeof state>
const getters: GetterTree<RootState, RootState> = {
    step: state => state.step,
    isNext: state => state.isNext,
}

const mutations: MutationTree<RootState> = {
    [SET_STEP](state, data) {
        state.step = { ...state.step, ...data };
    },
    [SET_IS_NEXT](state, data) {
        state.isNext = data;
    },
}

const actions: ActionTree<RootState, RootState> = {
    async [GET_STEP]({commit}, payload) {
        commit(SET_STEP, payload);
    },
}
const stepModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default stepModule