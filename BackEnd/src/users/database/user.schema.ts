
/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

export type UserDocument = Document<User>;

@Schema()
export class User extends Document {
    @Prop({ required: true, unique: true, minlength: 3, maxlength: 30 })
    email: string;

    @Prop({ required: true, minlength: 3, maxlength: 15 })
    username: string;

    @Prop({ required: true, minlength: 3, maxlength: 15 })
    password: string;
    @Prop ()
    token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function(next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});
