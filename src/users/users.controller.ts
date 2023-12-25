import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('request-account-deletion')
  @UseGuards(JwtAuthGuard)
  async requestAccountDeletion(@CurrentUser() user: any) {
    return this.usersService.requestUserDeletion(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }
}
