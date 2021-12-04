import { Module } from '@nestjs/common';
import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';
import { StepWithinRecipeExecutionController } from './step-within-recipe-execution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepWithinRecipeExecution } from './entities/step-within-recipe-execution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StepWithinRecipeExecution])],
  controllers: [StepWithinRecipeExecutionController],
  providers: [StepWithinRecipeExecutionService]
})
export class StepWithinRecipeExecutionModule {}
