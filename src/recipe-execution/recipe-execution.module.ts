import { Module } from '@nestjs/common';
import { RecipeExecutionService } from './recipe-execution.service';
import { RecipeExecutionController } from './recipe-execution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';
import { StepWithinRecipeExecutionModule } from '../step-within-recipe-execution/step-within-recipe-execution.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeExecution]),
    StepWithinRecipeExecutionModule
  ],
  controllers: [RecipeExecutionController],
  providers: [RecipeExecutionService],
  exports: [RecipeExecutionService]
})
export class RecipeExecutionModule {}
