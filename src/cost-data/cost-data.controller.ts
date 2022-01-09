import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostDataService } from './cost-data.service';
import { CreateCostDataDto } from './dto/create-cost-data.dto';
import { UpdateCostDataDto } from './dto/update-cost-data.dto';

@Controller('cost-data')
export class CostDataController {
  constructor(private readonly costDataService: CostDataService) {}

  @Post()
  create(@Body() createCostDataDto: CreateCostDataDto) {
    return this.costDataService.create(createCostDataDto);
  }

  @Get()
  findAll() {
    return this.costDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostDataDto: UpdateCostDataDto) {
    return this.costDataService.update(+id, updateCostDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costDataService.remove(+id);
  }
}
