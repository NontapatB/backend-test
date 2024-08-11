import { Controller, Post, Body, Req, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { Request } from 'express';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tweets')
@UseGuards(JwtAuthGuard)
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @Post()
  async create(
    @Body() createTweetDto: CreateTweetDto,
    @Req() request: Request,
  ) {
    const userId = (request.user as any)?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.tweetsService.create(createTweetDto, new Types.ObjectId(userId));
  }
  
  @Get()
  async findAll() {
    return this.tweetsService.findAll();
  }

}
