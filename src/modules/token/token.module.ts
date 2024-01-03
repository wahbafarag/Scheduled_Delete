import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { TokenController } from './controller/token.controller';
import { TokenRepository } from './repository/token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TOKEN_COLLECTION_NAME, tokenSchema } from './schema/token.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfigurations } from '../../../env/env.configuration';
import { HashModule } from '../common/hash/hash.module';
import { HelperFunctions } from './helpers/helper-functions';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TOKEN_COLLECTION_NAME,
        schema: tokenSchema,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfigurations().jwt.secret,
      signOptions: { expiresIn: envConfigurations().jwt.expiresIn },
    }),
    HashModule,
  ],
  providers: [TokenService, TokenRepository, HelperFunctions],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
