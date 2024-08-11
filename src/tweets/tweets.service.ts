import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tweet } from './schemas/tweet.schema';

@Injectable()
export class TweetsService {
  constructor(@InjectModel('Tweet') private readonly tweetModel: Model<Tweet>) {}

  async create(createTweetDto: { content: string }, userId: Types.ObjectId): Promise<Tweet> {
    const newTweet = new this.tweetModel({ ...createTweetDto, userId });
    return newTweet.save();
  }

  async getAllTweets(userId: Types.ObjectId): Promise<Tweet[]> {
    return this.tweetModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findTweetsByUserIds(userIds: Types.ObjectId[]): Promise<Tweet[]> {
    return this.tweetModel.find({ userId: { $in: userIds } }).sort({ createdAt: -1 }).exec();
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find().exec();
  }
}
