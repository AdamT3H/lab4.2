import {
    BadRequestException,
    Body,
    Controller,
    Post, 
    Get,
    Req,
    Query
} from '@nestjs/common';
import { LinkService } from '../service';
import { LinkDto, GetDateQueryDto} from '../models';
import { UserLeanDoc } from '../schema';
import { } from '../shared';

@Controller({path: '/links'})
export class LinksController{
    constructor (private readonly linkService: LinkService){}

    @Post("/")
    async createLink(@Body() body: LinkDto, @Req() req: Request & { user: UserLeanDoc }){
        try {
            const { authorization } = req.headers as any;
            const result = await this.linkService.createLink(body, authorization);
            return result;
        } catch (err) {
              throw new BadRequestException(err.message);
        }
    }

    @Get ("/")
    async getDate(@Query() query: GetDateQueryDto, @Req() req: Request) {
        try {
            const { authorization } = req.headers as any;
            const result = await this.linkService.getDate(query, authorization);
            return result;
        } catch (err) {
              throw new BadRequestException(err.message);
        }
    }

};