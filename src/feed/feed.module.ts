import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from '../tweets/schemas/tweet.schema';
import { UserSchema } from '../users/schemas/user.schema';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Tweet', schema: TweetSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule, 
  ],
  providers: [FeedService],
  controllers: [FeedController],
  exports: [FeedService],
})
export class FeedModule {}
