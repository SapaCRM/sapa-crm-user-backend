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
import { CreateCompanyDto } from './dto/request/create-company.dto';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Company } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/request/update-company.dto';
import { SetupCompanyDto } from './dto/request/setup-company.dto';
import { ResponseDto } from 'src/utils/response';

@ApiTags('Company')
@ApiExtraModels(ResponseDto)
@ApiExtraModels(Company)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(Company),
            },
          },
        },
      ],
    },
  })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const data = await this.companyService.createCompany(createCompanyDto);
    return {
      status: true,
      message: 'Company created successfully',
      data,
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been fetched successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(Company) },
            },
          },
        },
      ],
    },
  })
  async findAll() {
    const data = await this.companyService.findAllCompanies();
    return {
      status: true,
      message: 'Companies fetched successfully',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been fetched successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(Company),
            },
          },
        },
      ],
    },
  })
  @Get('/lookup')
  async getCompanybyApiKey(@Query('api-key') apiKey: string) {
    const data = await this.companyService.findCompanyByApiKey(apiKey);
    return {
      status: true,
      message: 'Company fetched successfully',
      data,
    };
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been updated succesfully.',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    },
  })
  @Post('setup-company')
  async setupCompany(@Body() setupCompanyDto: SetupCompanyDto) {
    const data = await this.companyService.setupCompany(setupCompanyDto);
    return {
      status: true,
      message: 'Company setup successfully',
    };
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been fetched successfully.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(Company),
            },
          },
        },
      ],
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'The record has been updated succesfully.',
    schema: {
      allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    },
  })
  async remove(@Param('id') id: string) {
    await this.companyService.remove(+id);
    return {
      status: true,
      message: 'Company deleted successfully',
    };
  }
}
