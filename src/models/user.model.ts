import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import { User } from '../interfaces';

export interface UserDoc extends User, Document {
    validatePassword: (data: string) => Promise<boolean>;
}

export const UserSchema = new Schema(
    {
        email: {
            lowercase: true,
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
            set: async (v: string) => await bcrypt.hash(v, 10),
            trim: true,
        },
        permissions: [{
            type: String,
        }],
        ...({} as { validatePassword: (data: string) => boolean }),
    },
    { timestamps: true }
);

UserSchema.method(
    'validatePassword',
    async function validatePassword(data: string) {
        const user = this as UserDoc;
        return await bcrypt.compare(data, user.password);
    }
);

export const UserModel = model<UserDoc>('User', UserSchema);
