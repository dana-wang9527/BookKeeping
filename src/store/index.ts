import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';


Vue.use(Vuex);

const newStore = new Vuex.Store({
    state: {
        recodeList: [] as recodeItem[]
    },
    mutations: {
        fetchRecodes: function (state) {
            state.recodeList = JSON.parse(window.localStorage.getItem('recodeList') || '[]');
        },
        createRecode(state, recode) {
            const recode2: recodeItem = clone(recode);
            recode2.createdAt = new Date();
            state.recodeList.push(recode2);
            newStore.commit('saveRecodes')
        },
        saveRecodes(state) {
            window.localStorage.setItem('recodeList', JSON.stringify(state.recodeList));
        },
    },
});

export default newStore;

