type recodeItem =
    {
        tags: string[];
        notes: string;
        type: string;
        amount: number;
        createdAt?: Date; //？代表可以不存在
    }