import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenService } from '../service/token.service';
import { RefreshGuard } from '../../auth/guards/refresh.guard';
import { CurrentUser } from '../../auth/decorator/current-user.dto';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { OkResponseService } from '../../../responses/ok.response.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refreshTokens(@Body() body: any, @CurrentUser() user: any) {
    let res = null;

    res = await this.tokenService.renewTokens({
      ...body,
      userId: user.userId,
      refreshToken: user.token,
    });
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }
}
