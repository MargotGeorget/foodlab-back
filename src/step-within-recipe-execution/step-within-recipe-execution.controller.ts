import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';
import { CreateStepWithinRecipeExecutionDto } from './dto/create-step-within-recipe-execution.dto';
import { UpdateStepWithinRecipeExecutionDto } from './dto/update-step-within-recipe-execution.dto';

@Controller('step-within-recipe-execution')
export class StepWithinRecipeExecutionController {
  constructor(private readonly stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
  }

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

  // @Get('steps/:id')
  // findAllStepInRecipeExecution(@Param('id') id: string) {
  //   return this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(+id);
  // }
  //
  // @Get('progressions/:id')
  // findAllProgressionInRecipeExecution(@Param('id') id: string) {
  //   return this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(+id)}

  //TODO: placer dans le service
/*  @Patch('update-all')
  updateAllStepsWithinRecipeExecution(@Body() updateStepsWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto[]){
    //Vérifier qu'aucune valeur number soit supérieur au nombre de valeur
    let valid = updateStepsWithinRecipeExecutionDto.every(step =>
      step.number <= updateStepsWithinRecipeExecutionDto.length && step.number>0);
    //Vérifier que toutes les valeurs sont différentes
    if (valid) {
      valid = updateStepsWithinRecipeExecutionDto.every(data1 =>
        updateStepsWithinRecipeExecutionDto.every((data2) =>
          data1 === data2 || data1.number != data2.number));
    }
    let res = [];
    if (valid){
      for(let updateStepWithinRecipeExecutionDto of updateStepsWithinRecipeExecutionDto){
        res.push(this.stepWithinRecipeExecutionService.update(updateStepWithinRecipeExecutionDto.id, updateStepWithinRecipeExecutionDto))
      }
    } else {
      throw new HttpException({
        status : HttpStatus.CONFLICT,
        error: 'Number of step must be different and between 1 and ' + updateStepsWithinRecipeExecutionDto.length,
      }, HttpStatus.CONFLICT);
    }
    return res;
  }*/

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto) {
    return this.stepWithinRecipeExecutionService.update(+id, updateStepWithinRecipeExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stepWithinRecipeExecutionService.remove(+id);
  }
}
