import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';


Vue.use(Vuex);
type RootStore = {
    recodeList: recodeItem[];
    tagList: Tag[];
    currentTag?: Tag;
}
const newStore = new Vuex.Store({
    state: {
        recodeList: [],
        tagList: [],
        currentTag: undefined
    } as RootStore,
    mutations: {
        setCurrentTag(state,id: string){
            state.currentTag=state.tagList.filter(t => t.id === id)[0]
        },
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
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');

            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            newStore.commit('saveTag');
            window.alert('添加成功');

        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    },
});

export default newStore;

