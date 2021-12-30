import { Injectable } from '@nestjs/common';
import { CreateCostDataDto } from './dto/create-cost-data.dto';
import { UpdateCostDataDto } from './dto/update-cost-data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostData } from './entities/cost-data.entity';

@Injectable()
export class CostDataService {

  constructor(
    @InjectRepository(CostData)
    private costDataRepository: Repository<CostData>,
  ) {}

  create(createCostDataDto: CreateCostDataDto) {
    //'This action adds a new costData'
    return this.costDataRepository.save(createCostDataDto);
  }

  findAll() {
    //`This action returns all costData`
    return this.costDataRepository.find();
  }

  findOne(id: number) {
    //`This action returns a #${id} costData`
    return this.costDataRepository.findOne({id: id});
  }

  update(id: number, updateCostDataDto: UpdateCostDataDto) {
    //`This action updates a #${id} costData`
    return this.costDataRepository.update({id: id}, updateCostDataDto);
  }

  remove(id: number) {
    //`This action removes a #${id} costData`
    //TODO: vérifier que c'est pas le cout pas défaut
    return this.costDataRepository.delete({id: id});
  }
}
