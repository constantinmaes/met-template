import { Document, model, Schema } from 'mongoose';
import { Example } from '../interfaces';

export interface ExampleDoc extends Example, Document {}

export const ExampleSchema = new Schema({}, { timestamps: true });

export const ExampleModel = model<ExampleDoc>('Example', ExampleSchema);
