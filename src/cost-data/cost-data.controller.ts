import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostDataService } from './cost-data.service';
import { CreateCostDataDto } from './dto/create-cost-data.dto';
import { UpdateCostDataDto } from './dto/update-cost-data.dto';

@Controller('cost-data')
export class CostDataController {
  constructor(private readonly costDataService: CostDataService) {}

  @Post()
  create(@Body() createCostDatumDto: CreateCostDataDto) {
    return this.costDataService.create(createCostDatumDto);
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
  update(@Param('id') id: string, @Body() updateCostDatumDto: UpdateCostDataDto) {
    return this.costDataService.update(+id, updateCostDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costDataService.remove(+id);
  }
}
