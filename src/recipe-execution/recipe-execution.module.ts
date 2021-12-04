import { Module } from '@nestjs/common';
import { RecipeExecutionService } from './recipe-execution.service';
import { RecipeExecutionController } from './recipe-execution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeExecution])],
  controllers: [RecipeExecutionController],
  providers: [RecipeExecutionService]
})
export class RecipeExecutionModule {}
