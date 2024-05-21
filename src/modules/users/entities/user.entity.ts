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
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  role: string;

  
}

