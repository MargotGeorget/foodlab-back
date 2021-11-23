import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientController } from './ingredient/ingredient.controller';
import { IngredientModule } from './ingredient/ingredient.module';
import {IngredientService} from "./ingredient/ingredient.service";

@Module({
  imports: [IngredientModule],
  controllers: [AppController, IngredientController],
  providers: [AppService, IngredientService],
})
export class AppModule {}
