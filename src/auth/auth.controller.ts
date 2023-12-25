import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpService } from './services/sign-up.service';
import { LoginService } from './services/login.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { LoginPayloadWithEmail } from './dtos/login-payload.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupService: SignUpService,
    private readonly loginService: LoginService,
  ) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) payload: CreateUserDto) {
    return this.signupService.signUp(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) payload: LoginPayloadWithEmail) {
    return this.loginService.login(payload);
  }
}
