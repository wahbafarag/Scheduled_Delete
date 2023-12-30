import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LoginService } from '../service/login.service';
import { LoginPayloadWithUsernameDto } from '../dtos/loginPayload.dto';
import { InternalSeverException } from '../../../exceptions/internal-sever.exception';
import { errorCodes } from '../../../utils/error-codes';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { OkResponseService } from '../../../responses/ok.response.service';
import { LocalAuthGuard } from '../guards/local.guard';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { SignupService } from '../service/signup.service';
import { CreatedResponseService } from '../../../responses/created-response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly signupService: SignupService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body(ValidationPipe) payload: LoginPayloadWithUsernameDto) {
    let res = null;
    res = await this.loginService.login(payload);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error.message);
    }
    return new OkResponseService(res.data);
  }

  @Post('signup')
  async signup(@Body(ValidationPipe) payload: CreateUserDto) {
    let res = null;
    res = await this.signupService.signup(payload);
    if (!res) {
      throw new InternalSeverException(errorCodes.UNEXPECTED_ERROR);
    } else if (res.error) {
      throw new BadRequestException(res.error);
    }
    return new CreatedResponseService(res.data);
  }
}
