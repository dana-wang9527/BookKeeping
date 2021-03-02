const localStorageKeyName = 'recodeList';
const recodeListModel = {
    clone(data: recodeItem[] | recodeItem) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as recodeItem[];
    },
    save(data: recodeItem[]) {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    }
};


export default recodeListModel;
