import { RecipesEntity } from 'src/recipes/entities/recipes.entity';
import { Repository } from 'typeorm';
export declare class RecipeService {
    private readonly _recipeRepository;
    constructor(_recipeRepository: Repository<RecipesEntity>);
}
