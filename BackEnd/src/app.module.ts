/* eslint-disable prettier/prettier */

// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mahmoudsaadtaha39:9FHyTgQN8v0vUJ3G@todo.6ogop1c.mongodb.net/?retryWrites=true&w=majority&appName=TODO'), // Connect to your MongoDB database
    TodosModule,UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

