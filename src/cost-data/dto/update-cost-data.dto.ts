import { PartialType } from '@nestjs/mapped-types';
import { CreateCostDataDto } from './create-cost-data.dto';

export class UpdateCostDataDto extends PartialType(CreateCostDataDto) {}
