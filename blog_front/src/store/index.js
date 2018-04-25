import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
    state:{
        navList:[],
        moni:[]
    },
    actions:{
        getNavList_A({commit},data){
            commit('getNavList_M',data)
        },
         moni_A({commit},data){
            commit('moni_M',data)
        }
    },
    mutations:{
        getNavList_M(state,data){
            state.navList = data
        },
        moni_M(state,data){
            state.moni = data
        }
    }
})