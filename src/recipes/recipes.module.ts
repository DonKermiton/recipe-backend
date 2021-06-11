import { RecipesEntity } from './entities/recipes.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './controllers/recipes.controller';
import { RecipeService } from './services/recipe.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RecipesEntity])
    ],
    controllers: [
        RecipesController
    ],
    providers: [
        RecipeService
    ]
    
})
export class RecipesModule {}
