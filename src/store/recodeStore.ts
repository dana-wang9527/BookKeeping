import clone from '@/lib/clone';

const localStorageKeyName = 'recodeList';

const recodeStore = {
    recodeList: [] as recodeItem[],
    fetchRecodes() {
        this.recodeList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.recodeList;
    },
    saveRecodes() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recodeList));
    },
    createRecode(recode: recodeItem) {
        const recode2: recodeItem = clone(recode);
        recode2.createdAt = new Date().toISOString();
        this.recodeList?.push(recode2);
        recodeStore.saveRecodes();
    },
};

recodeStore.fetchRecodes();
export default recodeStore;