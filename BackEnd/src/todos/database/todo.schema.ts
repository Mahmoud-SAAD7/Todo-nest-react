/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TodoDocument = Document<Todo>;

@Schema()
export class Todo {
    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        uppercase: true,
    })
    name: string;

    @Prop({
        type: String,
        minlength: 3,
        maxlength: 30,
        lowercase: true
    })
    description: string;

    @Prop()
    status: boolean;

    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true
    })
    category: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
