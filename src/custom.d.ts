type RootStore = {
    recodeList: recodeItem[];
    tagList: Tag[];
    currentTag?: Tag;
}

type recodeItem =
    {
        tags: Tag[];
        notes: string;
        type: string;
        amount: number;
        createdAt?: string; //？代表可以不存在
    }
type Tag = {
    id: string;
    name: string;
}

type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';   //success 表示成功，duplicated表示name重复
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    remove: (id: string) => boolean;
    save: () => void;
}

