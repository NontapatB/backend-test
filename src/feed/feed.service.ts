import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tweet } from '../tweets/schemas/tweet.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class FeedService {
  constructor(
    @InjectModel('Tweet') private readonly tweetModel: Model<Tweet>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getFeed(userId: Types.ObjectId | string): Promise<Tweet[]> {
    const userIdObj = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

    const user = await this.userModel.findById(userIdObj).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userIdObj} not found`);
    }

    const followingUsers = user.following || [];

    if (followingUsers.length === 0) {
      return [];
    }

    const tweets = await this.tweetModel
      .find({ userId: { $in: followingUsers } })
      .sort({ createdAt: -1 }) 
      .exec();

    return tweets;
  }
}
