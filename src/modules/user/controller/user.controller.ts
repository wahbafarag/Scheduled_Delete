import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { OkResponseService } from '../../../responses/ok.response.service';
import { AccessGuard } from '../../auth/guards/access.guard';
import { CurrentUser } from '../../auth/decorator/current-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessGuard)
  @Get('all-users-for-demo')
  async findAll(filters?: any) {
    let res = null;
    res = await this.userService.findAll(filters);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }

  @UseGuards(AccessGuard)
  @Post('request-account-deletion')
  async requestAccountDeletion(@CurrentUser() user: any) {
    let res = null;
    res = await this.userService.requestUserDeletion(user);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }
}
