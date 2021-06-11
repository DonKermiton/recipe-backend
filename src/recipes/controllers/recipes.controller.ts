import { Controller, Post, Req } from "@nestjs/common";

@Controller('/api/recipes')
export class RecipesController {
    
    constructor() {
               
    }

    @Post('create')
    public async createRecipe(@Req() request) {
    }
}