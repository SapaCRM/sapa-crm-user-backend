import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SetupCompanyDto } from './dto/setup-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const data = await this.companyService.createCompany(createCompanyDto);
    return {
      status: true,
      message: 'Company created successfully',
      data,
    };
  }

  @Get()
  async findAll() {
    const data = await this.companyService.findAllCompanies();
    return {
      status: true,
      message: 'Companies fetched successfully',
      data,
    };
  }

  @Get('/lookup')
  async getCompanybyApiKey(@Query('api-key') apiKey: string) {
    const data = await this.companyService.findCompanyByApiKey(apiKey);
    return {
      status: true,
      api: apiKey,
      message: 'Company fetched successfully',
      data,
    };
  }

  @Post()
  async setupCompany(@Body() setupCompanyDto: SetupCompanyDto) {
    const data = await this.companyService.setupCompany(setupCompanyDto);
    return {
      status: true,
      message: 'Company setup successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.companyService.findOne(id);
    return {
      status: true,
      message: 'Company fetched successfully',
      data,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.updateCompany(+id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.companyService.remove(+id);
    return {
      status: true,
      message: 'Company deleted successfully',
    };
  }
}
