import clone from '@/lib/clone';

const localStorageKeyName = 'recodeList';
const recodeListModel = {
    data: [] as recodeItem[],
    created(recode: recodeItem) {
        const recode2: recodeItem = clone (recode);
        recode2.createdAt = new Date();
        this.data.push(recode2)
        this.save()
    },

    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
};


export default recodeListModel;
