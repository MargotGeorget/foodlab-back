import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import {IngredientService} from "./ingredient/ingredient.service";
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient/entities/ingredient.entity';
import { AllergenCategoryModule } from './allergen-category/allergen-category.module';
import { IngredientCategoryModule } from './ingredient-category/ingredient-category.module';
import { AllergenCategory } from './allergen-category/entities/allergen-category.entity';
import { IngredientCategory } from './ingredient-category/entities/ingredient-category.entity';
import { IngredientWithinStepModule } from './ingredient-within-step/ingredient-within-step.module';
import { IngredientWithinStep } from './ingredient-within-step/entities/ingredient-within-step.entity';
import { RecipeExecutionModule } from './recipe-execution/recipe-execution.module';
import { RecipeExecution } from './recipe-execution/entities/recipe-execution.entity';
import { StepWithinRecipeExecutionModule } from './step-within-recipe-execution/step-within-recipe-execution.module';
import { StepWithinRecipeExecution } from './step-within-recipe-execution/entities/step-within-recipe-execution.entity';
import { RecipeCategoryModule } from './recipe-category/recipe-category.module';
import {RecipeCategory} from "./recipe-category/entities/recipe-category.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        Ingredient,
        AllergenCategory,
        IngredientCategory,
        IngredientWithinStep,
        RecipeExecution,
        StepWithinRecipeExecution,
        IngredientCategory,
        RecipeCategory
      ],
      //entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      //autoLoadEntities: true,
    }),
    AllergenCategoryModule,
    IngredientCategoryModule,
    IngredientModule,
    IngredientWithinStepModule,
    RecipeExecutionModule,
    StepWithinRecipeExecutionModule,
    RecipeCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
