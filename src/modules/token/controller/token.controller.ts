import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TokenService } from '../service/token.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { OkResponseService } from '../../../responses/ok.response.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshTokens(@Body() body: any, @CurrentUser() user: any) {
    let res = null;
    console.log('user', user);
    res = await this.tokenService.renewTokens({ ...body, userId: user.userId });
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Body() body: any, @CurrentUser() user: any) {
    let res = null;
    
    res = await this.tokenService.invalidateToken({
      ...body,
      userId: user.userId,
    });
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new OkResponseService(res.data);
  }
}
