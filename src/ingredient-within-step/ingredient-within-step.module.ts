import { Module } from '@nestjs/common';
import { IngredientWithinStepService } from './ingredient-within-step.service';
import { IngredientWithinStepController } from './ingredient-within-step.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientWithinStep } from './entities/ingredient-within-step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientWithinStep])],
  controllers: [IngredientWithinStepController],
  providers: [IngredientWithinStepService]
})
export class IngredientWithinStepModule {}
