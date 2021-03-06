import recodeListModel from '@/models/RecodeListModel';
import tagListsModel from '@/models/tagList';
//recode store
const store = {
    recodeList: recodeListModel.fetch(),
    createRecode: (recode: recodeItem) => recodeListModel.created(recode),

    //tag store
    tagList: tagListsModel.fetch(),
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];
    },
    createTag: (name: string) => {
        const message = tagListsModel.create(name);
        if (message === 'duplicated') {
            window.alert('标签名重复');
        } else if (message === 'success') {
            window.alert('添加成功');
        }
    },

    removeTag: (id: string) => {
        return tagListsModel.remove(id);
    },
    updateTag: (id: string, name: string) => {
        return tagListsModel.update(id, name);
    },
};

export  default store;