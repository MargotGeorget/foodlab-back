import { Module } from '@nestjs/common';
import { CostDataService } from './cost-data.service';
import { CostDataController } from './cost-data.controller';

@Module({
  controllers: [CostDataController],
  providers: [CostDataService]
})
export class CostDataModule {}
