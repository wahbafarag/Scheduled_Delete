import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { USER_COLLECTION_NAME } from '../../user/schema/user.schema';
import { TokenSourceEnum } from '../../auth/enums/enums';

export const TOKEN_COLLECTION_NAME = 'token';

@Schema({ timestamps: true, collection: TOKEN_COLLECTION_NAME })
export class Token {
  _id: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: USER_COLLECTION_NAME })
  userId: Types.ObjectId;

  @Prop({ required: true, type: String })
  refreshTokenHash: string;

  @Prop({ required: true, enum: TokenSourceEnum })
  source: string;

  @Prop({
    type: Date,
    default() {
      new Date(
        Date.now() + parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION, 10),
      );
    },
  })
  expiresAt: Date;
}

export const tokenSchema = SchemaFactory.createForClass(Token);
// tokenSchema.index({ userId: 1, source: 1 }, { unique: true });
