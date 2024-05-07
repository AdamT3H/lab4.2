import { Injectable } from '@nestjs/common';
import { LinkDto, GetDateQueryDto } from '../models';
import { LinkDoc, Links, Users, UserDoc, UserSchema  } from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAlreadyInUse, UserWasNotCreated} from '../shared';
import {UserApiKeyMiddleware} from '../midellware/userAuthorization.middleware'
import * as uuid from 'uuid';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Links.name)
    private readonly linkModel: Model<LinkDoc>,
    @InjectModel(Users.name)
    private readonly userModel: Model<UserDoc>,
  ) {}

  async createLink (body: LinkDto, authorization: string){

    const cut = uuid.v1().replace(/-/g, '').substring(0, 15);
    console.log(cut);


    const result = new Date();

    result.setDate(result.getDate() + 5);
    
    console.log(result);

    const doc = new this.linkModel({
        link:{original: body.originalLink, cut: cut},
        UserID: authorization,
        ExpiredAt: result
    });

    const link = await doc.save();

    return link.toObject();
  }

  async getDate (query: GetDateQueryDto, authorization: string){

    // console.log(query.expiredAt.lt)
    // console.log(query.expiredAt.gt)
    // const gtDate = new Date();
    // console.log(gtDate)

    if (query.expiredAt.gt && query.expiredAt.lt) {
        const result = await this.linkModel.find({
            UserID: authorization,
            ExpiredAt: {
                $gt: query.expiredAt.gt,
                $lt: query.expiredAt.lt
            }
        });
        return result
    } else if (query.expiredAt.lt){
        console.log("lt") 
        const result = await this.linkModel.find({
            UserID: authorization,
            ExpiredAt: {
                $lt: query.expiredAt.lt
            }
        });
        return result
    } else if(query.expiredAt.gt){
        console.log("gt") 
        const result = await this.linkModel.find({
            UserID: authorization,
            ExpiredAt: {
                $gt: query.expiredAt.gt
            }
        });
        return result
    }
  }

  async getShortLink(cut: string, res) {
    console.log(cut)
    const result = await this.linkModel.findOne({
        "link.cut": cut
    });


    return res.redirect(result.link.original)
  };

}