import { Module } from '@nestjs/common';
import { TokenRepository } from './repository/token.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { TOKEN_COLLECTION_NAME, tokenSchema } from './schema/token.schema';
import { TokenService } from './service/token.service';
import { HashModule } from '../common/hash/hash.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenController } from './controller/token.controller';

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
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN_MS },
    }),
    HashModule,
  ],
  providers: [TokenRepository, TokenService],
  controllers: [TokenController],
  exports: [TokenService],
})
export class TokenModule {}
