import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        LOADING: false,
        token: localStorage.getItem('token'),
        tabbarActive: 0,
        staffer_id: localStorage.getItem('staffer_id'),
				staffer_name: localStorage.getItem('staffer_name'),
        tabActive: 0,
        showHeader: localStorage.getItem('showHeader'),
				showUploadPic:[]
    },
    mutations: {
        setToken(state, val) {
            state.token = val;
        },
        setStaffer_id(state, val) {
            state.staffer_id = val;
        },
				setStaffer_name(state, val) {
				    state.staffer_name = val;
				},
        setTabActive(state, val) {
            state.tabActive = val;
        },
        setTabbarActive(state, val) {
            state.tabbarActive = val;
        },
        showLoading(state) {
            state.LOADING = true
        },
        hideLoading(state) {
            state.LOADING = false
        },
        setShowHeader(state, val) {
            state.showHeader = val;
        },
				setUploadPic(state,val){
					  state.showUploadPic = val;
						console.log(val,'store val');
				}
    },
    actions: {
        asyncSetToken(context) {
            context.commit('setToken')
        }
    },
    modules: {}
})