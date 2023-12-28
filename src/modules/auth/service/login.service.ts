import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/services/users.service';
import { DeletedUsersService } from '../../deleted-users/service/deleted-users.service';
import { LoginPayloadWithUsernameDto } from '../dtos/loginPayload.dto';
import { ServiceRes } from '../interface/service-response.interface';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectConnection() private nativeMongooseConnection: Connection,
    private readonly usersService: UsersService,
    private readonly deleteUsersService: DeletedUsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      //
      if (user.deletedAt !== null && new Date(user.deletedAt) > new Date()) {
        //
        const session = await this.nativeMongooseConnection.startSession();

        await session.withTransaction(async () => {
          await this.usersService.findOneAndUpdate(
            { _id: user._id },
            { deletedAt: null },
          );
          await this.deleteUsersService.findOneAndDelete({ _id: user._id });
        });

        await session.endSession();
        return user;
      }
      //
      return user;
    }
    return null;
  }

  async login(user: LoginPayloadWithUsernameDto) {
    let serviceResponse: ServiceRes = { data: null, error: null };
    try {
      //
      const userRef = await this.usersService.findOne({
        username: user['username'],
      });

      const userDoc = userRef['_doc'];
      const { password, ...result } = userDoc;

      serviceResponse.data = {
        ...result,
        token: this.jwtService.sign({ sub: userDoc._id }),
      };
      //
    } catch (err) {
      serviceResponse.error = err;
    }
    return serviceResponse;
  }
}
