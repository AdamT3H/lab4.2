import { Injectable } from '@nestjs/common';
import { UserDto } from '../models';
import { UserDoc, Users, LinkDoc, Links } from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAlreadyInUse, UserWasNotCreated} from '../shared';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
    @InjectModel(Links.name)
    private readonly linkModel: Model<LinkDoc>,
  ) {}

  async createUser(body: UserDto) {

    const isExists = await this.userModel.findOne({
      email: body.email,
    });
    console.log("''", isExists)

    if (isExists) {
      throw new UserAlreadyInUse(
        `User with email ${body.email} already in use`,
      );
    }

    const apiKey = randomUUID();

    const doc = new this.userModel({
      ...body,
      apiKey: apiKey,
    });
    const user = await doc.save();

    return user.toObject();
  };

  async loginUser(body: UserDto) {

    const isExists = await this.userModel.findOne({
      email: body.email,
      password: body.password
    });

    if (!isExists) {
      throw new UserWasNotCreated(
        `User with that login or email wasn't found`,
      );
    }

    return isExists.toObject();
  }
}
