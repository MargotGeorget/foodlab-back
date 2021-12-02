import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';
import { CreateStepWithinRecipeExecutionDto } from './dto/create-step-within-recipe-execution.dto';
import { UpdateStepWithinRecipeExecutionDto } from './dto/update-step-within-recipe-execution.dto';

@Controller('step-within-recipe-execution')
export class StepWithinRecipeExecutionController {
  constructor(private readonly stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {}

  @Post()
  create(@Body() createStepWithinRecipeExecutionDto: CreateStepWithinRecipeExecutionDto) {
    return this.stepWithinRecipeExecutionService.create(createStepWithinRecipeExecutionDto);
  }

  @Get()
  findAll() {
    return this.stepWithinRecipeExecutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepWithinRecipeExecutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto) {
    return this.stepWithinRecipeExecutionService.update(+id, updateStepWithinRecipeExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepWithinRecipeExecutionService.remove(+id);
  }
}
