import { Module } from '@nestjs/common';
import { CostDataService } from './cost-data.service';
import { CostDataController } from './cost-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostData } from './entities/cost-data.entity';

@Module({

  imports: [TypeOrmModule.forFeature([CostData])],
  controllers: [CostDataController],
  providers: [CostDataService]
})
export class CostDataModule {}
