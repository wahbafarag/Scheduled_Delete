import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../enums/user-role.enum';
import { Types } from 'mongoose';
import { ttlExpiresAfterInSecs } from '../constants/constants';

export const USER_COLLECTION_NAME = 'User';

@Schema({ collection: USER_COLLECTION_NAME, timestamps: true })
export class User {
  _id?: Types.ObjectId;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({
    required: true,
    type: String,
    enum: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN, UserRoles.MEMBER],
  })
  role: string;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
userSchema.index(
  { deletedAt: 1 },
  {
    expireAfterSeconds: ttlExpiresAfterInSecs,
  },
);
