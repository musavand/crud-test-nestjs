/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateCustomerDto } from 'src/domain/dto/create-customer.dto';
import {
  Column, 
  Entity,
  PrimaryGeneratedColumn,  
} from 'typeorm';

@Entity('Customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, length: 50 })
  FirstName: string;
  
  @Column({ unique: true, length: 50 })
  LastName: string;

  @Column()
  DateOfBirth: Date;

  @Column({ unique: true, length: 50 })
  PhoneNumber: string;

  @Column({ unique: true, length: 150 })
  Email: string;  

  @Column({ unique: true, length: 150 })
  BankAccountNumber: string;


  @Column({
    type: 'timestamp',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
  public static async entityToDto(entity : CustomerEntity): Promise<CreateCustomerDto>{
    const dto: CreateCustomerDto = ({
      ...entity
    });
    return dto;
  }
}
