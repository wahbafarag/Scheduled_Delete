import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { OkResponseService } from '../../../responses/ok.response.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('request-account-deletion')
  async requestAccountDeletion(@CurrentUser() user: any) {
    let res = null;
    res = await this.usersService.requestUserDeletion(user);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }

  // user requested to delete his account , but still have a valid token
  // prevent him from accessing any route , give him badRequestException and invalid user message
  @UseGuards(JwtAuthGuard)
  @Get('all-users-for-demo')
  async findAll(filters?: any) {
    let res = null;
    res = await this.usersService.findAll(filters);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }
}
