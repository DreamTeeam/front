interface ICard{
    name: string;
    image: string;
}

interface ICardProduct extends ICard{
    price: number;
    stock?: number;
}

export type {ICard, ICardProduct};