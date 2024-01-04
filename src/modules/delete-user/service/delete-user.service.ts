import { Injectable } from '@nestjs/common';
import { DeletedUserRepository } from '../repository/deleted-users.repository';
import { DeletedUsers } from '../schema/deleted-users.schema';

@Injectable()
export class DeletedUserService {
  constructor(private readonly deletedUserRepository: DeletedUserRepository) {}

  async createDeletedUser(user: any): Promise<DeletedUsers> {
    return await this.deletedUserRepository.Create(user);
  }

  async findOneAndDelete(filter: any): Promise<DeletedUsers> {
    return await this.deletedUserRepository.findOneAndDelete(filter);
  }
}
