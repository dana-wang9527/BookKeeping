import recodeStore from '@/store/recodeStore';
import tagStore from '@/store/tagStore';

const store = {
    ...recodeStore,
    ...tagStore
};
export default store;