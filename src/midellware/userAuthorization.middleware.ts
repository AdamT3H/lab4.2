import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDoc, UserLeanDoc, Users } from '../schema';
import { Model } from 'mongoose';
import { NextFunction } from 'express';

@Injectable()
export class UserApiKeyMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  async use(
    req: Request & { user: UserLeanDoc },
    res: Response,
    next: NextFunction
  ) {
    const { authorization } = req.headers as any;

    if (!authorization) {
      throw new UnauthorizedException(
        `User do not provide ApiKey`,
      );
    }

    const user = await this.userModel.findOne({ 
      apiKey: authorization 
    });

    if (!user) {
      throw new BadRequestException(
        `User is not authorized`,
      );
    }

    req.user = user.toObject();

    next();
  }
}
