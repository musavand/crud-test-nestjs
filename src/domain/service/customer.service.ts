/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../../infrastructure/entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICustomerService } from '../port/input/customer-service.interface';
import { AppLogger } from 'src/infrastructure/config/log/console.logger';
import { ICustomerRepository } from '../port/output/customer-repository.interface';
import { IEncoderService } from '../port/input/encoder-service.interface';
import { ICacheService } from '../port/input/cache-service.interface';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { date } from 'joi';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    private readonly logger: AppLogger,
    @Inject(ICacheService) private readonly cacheService: ICacheService,
    @Inject(IEncoderService) private readonly encoderService: IEncoderService,
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {
    this.logger.setContext(CustomerService.name);
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customers = await this.customerRepository.findAll();
    //console.log(`3-serv -getAllCustomers ${JSON.stringify(customers)} `);
    return customers;
  }
  async findById(id: string): Promise<CustomerEntity> {
    return this.customerRepository.findById(id);
  }
  async save(
    customerDto: CreateCustomerDto,
  ): Promise<CustomerEntity | null> {
    const entity = this.buildCustomerEntity(customerDto);
    return this.customerRepository.save(entity);
  }
  /*
  async update(id: number, customer): Promise<CustomerEntity> {
    const existCustomer = await this.customerRepository.findOne({
      where: { id: id },
    });
    if (!existCustomer) {
      throw new HttpException(
        `Customer by id ${id} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newCustomer = {
      ...customer,
      updateTime: new Date(),
    };
    try {
      await this.customerRepository.update(id, newCustomer);
      return this.customerRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        `can not update category by name =  ${newCustomer.firstName} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await this.customerRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `can not delete category by id ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(createCustomerDto: CreateCustomerDto) {
    const { FirstName, LastName, BankAccountNumber, DateOfBirth, Email } =
      createCustomerDto;
    try {
      const customer = await this.customerRepository.findOne({
        where: { Email },
      });
      if (customer) {
        throw new HttpException(
          `customer by email = ${Email} allready exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
      //console.log(`FirstName =  ${FirstName} , LastName =${LastName} ,Email =  ${Email} , BankAccountNumber =${BankAccountNumber}, DateOfBirth =${DateOfBirth}`)
     
      const newCustomer: Customer =
        await this.customerRepository.save(createCustomerDto);
      //console.log(`Create Customer by FirstName =  ${FirstName} , LastName =${LastName} ,Email =  ${Email} , BankAccountNumber =${BankAccountNumber}, DateOfBirth =${DateOfBirth}`)
      return newCustomer;
    } catch (error) {
      throw new HttpException(
        `can not craete customer by FirstName =  ${FirstName} , LastName =${LastName} ,Email =  ${Email} , BankAccountNumber =${BankAccountNumber}, DateOfBirth =${DateOfBirth}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  */
  private buildCustomerEntity(
    dto: CreateCustomerDto,
  ): Partial<CustomerEntity> | null {
    const unixTimeId = Date.now().toString();
    const encodedId = this.encoderService.encode(unixTimeId);

    if (!encodedId) {
      return null;
    }
    return {
      ...dto,
      id: encodedId,
      createTime : new Date(),
      updateTime : new Date(),

    };
  }
}
