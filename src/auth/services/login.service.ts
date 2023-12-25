import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadWithEmail } from '../dtos/login-payload.dto';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { DeletedUsersService } from '../../deleted-users/deleted-users.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly deleteUsersService: DeletedUsersService,
    private readonly jwtService: JwtService,
    @InjectConnection() private nativeMongooseConnection: Connection,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.deletedAt !== null && new Date(user.deletedAt) > new Date()) {
        // user requested to delete his account 'logged in again case'
        // 1- cancel request , set deletedAt to null , delete from deleted users collection
        // 2- return user
        const session = await this.nativeMongooseConnection.startSession();
        await session.withTransaction(async () => {
          user.deletedAt = null;
          await user.save();
          await this.deleteUsersService.findOneAndDelete({ _id: user._id });
        });
        await session.endSession();
        return user;
      }
      return user;
    }
    return null;
  }

  async login(user: LoginPayloadWithEmail) {
    const userRef = await this.usersService.findOne({
      username: user['username'],
    });
    const userDoc = userRef['_doc'];
    const { password, ...result } = userDoc;
    return {
      ...result,
      token: this.jwtService.sign({ sub: userDoc._id }),
    };
  }
}
