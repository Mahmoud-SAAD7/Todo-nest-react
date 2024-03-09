/* eslint-disable prettier/prettier */

import { HttpException, Injectable } from '@nestjs/common';
import { User } from './database/user.schema';
import {  InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
 
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async create(userData: User): Promise<User> {
        const createdUser = new this.userModel(userData);
        return await createdUser.save();
    }
    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    async findUser(_id: string): Promise<User> {
        return await this.userModel.findById(_id).exec();
    }
    async login(email: string, password: string): Promise<{token: string }> {
        const user = await this.userModel.findOne({ email }).select('+password').exec();
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new HttpException('Wrong password', 401);
        }
        const token = jwt.sign({ email: user.email }, 'mySecert Key', { expiresIn: '1d' });
    
        return { token };
    }
    
    async updateUser( _id: string, updatedUser: User) {
        return await this.userModel.updateOne({_id}, {$set:updatedUser}).exec();
    }
    async removeUser(userId: string) {
       return await this.userModel.deleteOne({_id:userId}).exec();
    }
}
