import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';


Vue.use(Vuex);

const newStore = new Vuex.Store({
    state: {
        recodeList: [],
        createRecodeError: null,
        createTagError: null,
        tagList: [],
        currentTag: undefined
    } as RootStore,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        updateTag(state, {id, name}: { id: string; name: string }) {
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    newStore.commit('saveTag');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                newStore.commit('saveTag');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
        fetchRecodes: function (state) {
            state.recodeList = JSON.parse(window.localStorage.getItem('recodeList') || '[]');
        },
        createRecode(state, recode: recodeItem) {
            const recode2 = clone(recode);
            recode2.createdAt = new Date().toISOString();
            state.recodeList.push(recode2);
            newStore.commit('saveRecodes');

        },
        saveRecodes(state) {
            window.localStorage.setItem('recodeList', JSON.stringify(state.recodeList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (!state.tagList || state.tagList.length === 0) {
                newStore.commit('createTag', '衣');
                newStore.commit('createTag', '食');
                newStore.commit('createTag', '住');
                newStore.commit('createTag', '行');
            }
        },
        createTag(state, name: string) {
            state.createTagError = null;
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError = new Error('标签名重复了');
                return;
            }
            const id = createId().toString();
            state.tagList.push({id: id, name: name});
            newStore.commit('saveTag');
        },
        saveTag(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    },
});

export default newStore;

