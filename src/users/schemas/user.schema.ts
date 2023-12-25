import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from '../enums/user-role.enum';
import { Types } from 'mongoose';

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
  deletedAt?: Date; // ttl index on this field
  async save() {
    await this.save();
  }
}

export const userSchema = SchemaFactory.createForClass(User);
// create ttl index on deletedAt to delete user document after 30 days
userSchema.index(
  { deletedAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
  },
);
