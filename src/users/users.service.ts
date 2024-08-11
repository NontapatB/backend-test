import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: Types.ObjectId | string): Promise<User> {
    const userId = typeof id === 'string' ? new Types.ObjectId(id) : id;
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async followUserByUsername(username: string, followUsername: string): Promise<User> {
    const user = await this.findByUsername(username);
    const userToFollow = await this.findByUsername(followUsername);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    if (!userToFollow) {
      throw new NotFoundException(`User with username ${followUsername} not found`);
    }

    const followUserIdObj = userToFollow._id as Types.ObjectId;

    if (!user.following.some(followId => followId.equals(followUserIdObj))) {
      user.following.push(followUserIdObj);
      await user.save();
    }

    return user;
  }

  async unfollowUserByUsername(username: string, unfollowUsername: string): Promise<User> {
    const user = await this.findByUsername(username);
    const userToUnfollow = await this.findByUsername(unfollowUsername);

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    if (!userToUnfollow) {
      throw new NotFoundException(`User with username ${unfollowUsername} not found`);
    }

    const unfollowUserIdObj = userToUnfollow._id as Types.ObjectId;

    user.following = user.following.filter(followId => !followId.equals(unfollowUserIdObj));
    await user.save();

    return user;
  }
}
