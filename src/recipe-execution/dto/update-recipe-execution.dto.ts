import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeExecutionDto } from './create-recipe-execution.dto';

export class UpdateRecipeExecutionDto extends PartialType(CreateRecipeExecutionDto) {}
