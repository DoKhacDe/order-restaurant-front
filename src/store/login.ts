
import ApiService from "@/common/api.service";

import JwtService from "@/common/jwt.service";
import {GetterTree, ActionTree, MutationTree,Module} from 'vuex';

/* eslint-disable @typescript-eslint/no-explicit-any */

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "/auth/login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_ADMIN = "updateAdmin";
export const FORGOT_PASSWORD = "/auth/forgot-password";
export const RESET_PASSWORD = "/auth/reset-password";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setAdmin";
export const SET_ERROR = "setError";
export const SET_FORGOT = "setForgot";
export const SET_RESET = "setReset";

export const state = () => ({
    admin: {} as any,
    password: '',
    reset_password: {},
    errors: null,
    isAuthenticated: false

})

 type RootState = ReturnType<typeof state>
 const getters: GetterTree<RootState, RootState> = {
    currentAdmin :state  =>  state.admin,
    isAuthenticated :state  =>  state.isAuthenticated,
}

 const mutations: MutationTree<RootState> = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
     [SET_FORGOT](state, data) {
         state.password = data
     },
     [SET_RESET](state, data) {
         state.reset_password = data
     },
    [SET_AUTH](state, admin) {
        state.isAuthenticated = true;
        state.admin = admin;
        if (state.admin) {
            JwtService.saveToken(state.admin.data.access_token);
            JwtService.saveUser(state.admin.data.data);
            ApiService.setHeader();
        }
        // @ts-ignore
        state.errors = {};
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.admin = {};
        JwtService.destroyToken();
        JwtService.destroyUser();
        // @ts-ignore
        state.errors = {};
    },
    // [SET_USER_CURRENT](state, user) {
    //     state.admin = user;
    //     if (state.admin) {
    //         JwtService.saveUser(state.admin.data);
    //     }
    // },
}

 const actions: ActionTree<RootState, RootState> = {
   async  [LOGIN](context, credentials) {
       return new Promise((resolve, reject) => {
             ApiService.post(LOGIN, credentials)
                 .then((data:any) => {
                     if (data.status) {
                         context.commit(SET_AUTH, data.data);
                     } else {
                         context.commit(SET_ERROR, data.message);
                     }
                     resolve(data.data);
                 })
                 .catch(({ response }) => {
                     reject(response);
                 });
         });
     },
    //  async [USER_CURRENT](context) {
    //      return new Promise(resolve => {
    //          ApiService.get(USER_CURRENT).then(({ data }: any) => {
    //              if (data.status) {
    //                  context.commit(SET_USER_CURRENT, data);
    //              }
    //              resolve(data);
    //          });
    //      });
    //  },
     async  [FORGOT_PASSWORD](context, credentials) {
         return new Promise((resolve, reject) => {
             ApiService.post(FORGOT_PASSWORD, credentials)
                 .then((data:any) => {
                     if (data.status) {
                         context.commit(SET_FORGOT, data.data);
                     } else {
                         context.commit(SET_ERROR, data.message);
                     }
                     resolve(data.data);
                 })
                 .catch(({ response }) => {
                     reject(response);
                 });
         });
     },
     async  [RESET_PASSWORD](context, credentials) {
         return new Promise((resolve, reject) => {
             ApiService.post(RESET_PASSWORD, credentials)
                 .then((data:any) => {
                     if (data.status) {
                         context.commit(SET_RESET, data.data);
                     } else {
                         context.commit(SET_ERROR, data.message);
                     }
                     resolve(data.data);
                 })
                 .catch(({ response }) => {
                     reject(response);
                 });
         });
     },
     [LOGOUT](context) {
         context.commit(PURGE_AUTH);
     },
     [VERIFY_AUTH]() {
         ApiService.setHeader();
         // if (JwtService.getToken()) {
         //   ApiService.setHeader();
         //   //   ApiService.get("verify")
         //   //     .then(({ data }) => {
         //   //       context.commit(SET_AUTH, data);
         //   //     })
         //   //     .catch(({ response }) => {
         //   //       context.commit(SET_ERROR, response.data.errors);
         //   //     });
         // } else {
         //   // context.commit(PURGE_AUTH);
         // }
     },
}
const loginModule: Module<any, any> = {
    state,
    mutations,
    actions,
    getters,
}

export default loginModule
