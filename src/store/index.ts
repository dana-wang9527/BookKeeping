import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';


Vue.use(Vuex);

const newStore = new Vuex.Store({
    state: {
        recodeList: [] as recodeItem[],
        tagList: [] as Tag[]
    },
    mutations: {
        fetchRecodes: function (state) {
            state.recodeList = JSON.parse(window.localStorage.getItem('recodeList') || '[]');
        },
        createRecode(state, recode) {
            const recode2: recodeItem = clone(recode);
            recode2.createdAt = new Date();
            state.recodeList.push(recode2);
            newStore.commit('saveRecodes');
        },
        saveRecodes(state) {
            window.localStorage.setItem('recodeList', JSON.stringify(state.recodeList));
        },
        fetchTags(state) {
            return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
                return 'duplicated';
            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            newStore.commit('saveTag');
            window.alert('添加成功');
            return 'success';
        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        }
    },
});

export default newStore;

