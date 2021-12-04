import { Module } from '@nestjs/common';
import { RecipeCategoryService } from './recipe-category.service';
import { RecipeCategoryController } from './recipe-category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RecipeCategory} from "./entities/recipe-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecipeCategory])],
  controllers: [RecipeCategoryController],
  providers: [RecipeCategoryService]
})
export class RecipeCategoryModule {}
