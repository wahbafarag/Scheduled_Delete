import { Injectable } from '@nestjs/common';
import { DeletedUsersRepository } from './deleted-users.repository';
import { DeletedUsers } from './schemas/deleted-user.schema';

@Injectable()
export class DeletedUsersService {
  constructor(
    private readonly deletedUsersRepository: DeletedUsersRepository,
  ) {}

  async createDeletedUser(user: any): Promise<DeletedUsers> {
    return await this.deletedUsersRepository.Create(user);
  }

  async findOneAndDelete(filter: any): Promise<DeletedUsers> {
    return await this.deletedUsersRepository.findOneAndDelete(filter);
  }
}
