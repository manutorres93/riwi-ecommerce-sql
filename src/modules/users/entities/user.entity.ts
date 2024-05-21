/*   */
import {  ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users' })
export class User{
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;
  
    
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({nullable: false})
  password: string;

  @ApiProperty()
  @Column({ default: 'user'})
  role: string;

  
}

