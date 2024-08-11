import { Controller, Post, Body, Get, Param, Put, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Put('follow/:username')
  async followUser(@Param('username') username: string, @Body() followDto: { followUsername: string }) {
    if (!followDto.followUsername) {
      throw new BadRequestException('Username to follow is required');
    }

    if (username === followDto.followUsername) {
      throw new BadRequestException('You cannot follow yourself');
    }

    return this.usersService.followUserByUsername(username, followDto.followUsername);
  }

  @Put('unfollow/:username')
  async unfollowUser(@Param('username') username: string, @Body() unfollowDto: { unfollowUsername: string }) {
    if (!unfollowDto.unfollowUsername) {
      throw new BadRequestException('Username to unfollow is required');
    }

    if (username === unfollowDto.unfollowUsername) {
      throw new BadRequestException('You cannot unfollow yourself');
    }

    return this.usersService.unfollowUserByUsername(username, unfollowDto.unfollowUsername);
  }
}
