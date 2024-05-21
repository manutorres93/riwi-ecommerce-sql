import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<User>{
    /* const {password,email}=createUserDto
    const existingUser = await this.userRepository
    .findOneBy({ email })
    

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
     */
    /* const plainToHash= await hash(password, 10) 
    createUserDto={...createUserDto,password:plainToHash}
    
    const createdUser= await this.userModel.create(createUserDto) */
    
    /* return createdUser; */
    const user = this.userRepository.create(createUserDto)
    return await this.userRepository.save(user)
   
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    
    if (users.length === 0){
            throw new NotFoundException('Records not found in database');
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
   
    const user = await this.userRepository.findOneBy({id});

    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email })
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOneByEmailToRegister(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new HttpException(`User email ${email} already exists`, HttpStatus.CONFLICT);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    
    const updatedUser = await this.userRepository
      .findOneBy({id})
    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.userRepository.merge(updatedUser, updateUserDto)
    return await this.userRepository.save(updatedUser);

    
  }

  async remove(id: string): Promise<string> {
    
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
    return 'User deleted successfully'
  }
}
