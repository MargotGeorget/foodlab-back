import { Injectable } from '@nestjs/common';
import { CreateCostDataDto } from './dto/create-cost-data.dto';
import { UpdateCostDataDto } from './dto/update-cost-data.dto';

@Injectable()
export class CostDataService {
  create(createCostDatumDto: CreateCostDataDto) {
    return 'This action adds a new costDatum';
  }

  findAll() {
    return `This action returns all costData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} costDatum`;
  }

  update(id: number, updateCostDatumDto: UpdateCostDataDto) {
    return `This action updates a #${id} costDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} costDatum`;
  }
}
