import { Controller } from '@nestjs/common';
import { DeletedUsersService } from './deleted-users.service';

@Controller('deleted-users')
export class DeletedUsersController {
  constructor(private readonly deletedUsersService: DeletedUsersService) {}
}
