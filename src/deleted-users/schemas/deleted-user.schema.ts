import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';

export const DELETED_USER_COLLECTION_NAME = 'DeletedUsers';

@Schema({
  collection: DELETED_USER_COLLECTION_NAME,
  discriminatorKey: 'type',
  timestamps: true,
})
export class DeletedUsers extends User {}

export const deletedUserSchema = SchemaFactory.createForClass(DeletedUsers);
