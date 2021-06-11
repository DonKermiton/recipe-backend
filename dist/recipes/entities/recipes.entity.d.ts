export declare class RecipesEntity {
    id: number;
    title: string;
    description: string;
    ingredients: {
        count: number;
        name: string;
    };
    steps: {
        step: number;
        name: string;
        description: string;
    };
}
