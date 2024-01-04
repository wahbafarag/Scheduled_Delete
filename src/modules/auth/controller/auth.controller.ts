import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { SignupService } from '../service/signup.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { CreatedResponseService } from '../../../responses/created-response.service';
import { LoginPayload } from '../dto/login-payload.dto';
import { LocalGuard } from '../guards/local.guard';
import { AccessGuard } from '../guards/access.guard';
import { CurrentUser } from '../decorator/current-user.dto';
import { TokenService } from '../../token/service/token.service';
import { OkResponseService } from '../../../responses/ok.response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly signUpService: SignupService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) payload: CreateUserDto) {
    let res = null;
    res = await this.signUpService.signup(payload);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new CreatedResponseService(res.data);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body(ValidationPipe) payload: LoginPayload) {
    let res = null;
    res = await this.loginService.login(payload);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new CreatedResponseService(res.data);
  }

  @UseGuards(AccessGuard)
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
