import { PartialType } from '@nestjs/mapped-types';
import { CreateStepWithinRecipeExecutionDto } from './create-step-within-recipe-execution.dto';

export class UpdateStepWithinRecipeExecutionDto extends PartialType(CreateStepWithinRecipeExecutionDto) {
  id: number
}
