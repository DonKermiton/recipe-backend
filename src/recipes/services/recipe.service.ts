import {
    RecipesEntity
} from 'src/recipes/entities/recipes.entity';
import {
    Injectable
} from "@nestjs/common";
import {
    InjectRepository
} from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(RecipesEntity) 
        private readonly _recipeRepository: Repository<RecipesEntity>
    ) {

    }

    async addRecipe(recipe: any): Promise<any> {
        console.log(recipe);
        
        
    }

    async getAllRecipes(): Promise<any> {
        return this._recipeRepository.find();
    }
}