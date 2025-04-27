/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CustomerService } from '../../../../domain/service/customer.service';
import { CustomerEntity } from '../../../entity/customer.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAllCustomerQuery } from 'src/application/query/customer/find-all-customer.query';
//import { CreateCustomerDto } from './dto/create-customer.dto';
import { Response } from 'express';
import { FindCustomerQuery } from 'src/application/query/customer/find-customer.query';
import { CreateCustomerCommand } from 'src/application/command/customer/create-customer.command';
import { CreateCustomerDto } from 'src/domain/dto/create-customer.dto';

@ApiTags('Customer controller')
@Controller('Customer')
export class CustomerController {
  constructor(
    //  private readonly customerService: CustomerService
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @ApiOperation({ summary: 'get all Customers' })
  @Get('/')
  async getAllCustomers(@Res() res: Response): Promise<void> {
    //console.log(`1-ctrl-getAllCustomers`);
    const customers = await this.queryBus.execute(new FindAllCustomerQuery());
    if (!customers) {
      res.status(HttpStatus.NOT_FOUND).send('Not found');
      return;
    }
    res.send(JSON.stringify(customers));
  }

  @ApiOperation({ summary: 'get a Customer by id' })
  @Get(':id')
  async findById(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<CustomerEntity> {
    const customer = await this.queryBus.execute(new FindCustomerQuery(id));
    console.log(`in controller ${JSON.stringify(customer)}`);
    if (!customer) {
      res.status(HttpStatus.NOT_FOUND).send('Not found');
      return;
    }
    res.send(JSON.stringify(customer));
  }
  @ApiOperation({ summary: 'create new Customer' })
  @Post()
  async create(
    @Res() res: Response,
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    const customer = await this.commandBus.execute(
      new CreateCustomerCommand(createCustomerDto),
    );
    if (!customer) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Something went wrong.');
      return;
    }
    return customer;
  }
  /*
  
  @ApiOperation({ summary: 'update a Customer' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() customer: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerService.update(parseInt(id, 10), customer);
  }
  @ApiOperation({ summary: 'delete a Customer' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.customerService.delete(parseInt(id, 10));
  }
    */
}
