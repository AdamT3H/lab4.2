import {
    BadRequestException,
    Body,
    Controller,
    Post, 
    Get,
    Req,
    Res,
    Query, 
    Param
} from '@nestjs/common';
import { LinkService } from '../service';
import { LinkDto, GetDateQueryDto} from '../models';
import { UserLeanDoc } from '../schema';
import { } from '../shared';

@Controller({ path: '/shortLink' })
export class ShortLinkController {
    constructor(private readonly linkService: LinkService) {}

    @Get("/:cut")
    async getShortLink(@Param('cut') cut: string, @Res() res) {
        try {
            const result = await this.linkService.getShortLink(cut, res);
            return result;
        } catch (err) {
              throw new BadRequestException(err.message);
        }
    }
}