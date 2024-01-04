import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../user/service/user.service';
import { DeletedUserService } from '../../delete-user/service/delete-user.service';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { LoginPayload } from '../dto/login-payload.dto';
import { ServiceRes } from '../../common/service-response.interface';
import { TokenService } from '../../token/service/token.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly deletedUserService: DeletedUserService,
    @InjectConnection() private nativeMongooseConnection: Connection,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    //
    
    if (user && (await bcrypt.compare(pass, user.password))) {
      if (user.deletedAt !== null && new Date(user.deletedAt) > new Date()) {
        //
        const session = await this.nativeMongooseConnection.startSession();

        //
        await session.withTransaction(async () => {
          await this.userService.findOneAndUpdate(
            { _id: user._id },
            { deletedAt: null },
          );
          await this.deletedUserService.findOneAndDelete({ _id: user._id });
        });

        await session.endSession();
        return user;
      }
      return user;
    }
    return null;
  }

  async login(payload: LoginPayload) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      //

      const userRef = await this.userService.findOne({
        email: payload.email,
      });

      let userDoc = userRef['_doc'];
      const { password, ...result } = userDoc;

      const tokens = await this.tokenService.generateNewTokens({
        userId: result._id,
        source: payload.source,
      });

      serviceResponse.data = {
        ...result,
        tokens,
      };

      //
    } catch (error) {
      serviceResponse.error = error;
    }
    return serviceResponse;
  }
}
