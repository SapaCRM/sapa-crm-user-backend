import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/request/create-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { MongoRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { BCRYPT_HASH_ROUND } from 'src/utils/constants';
import { decryptApiKey, generateApiKey } from 'src/utils/helpers';
import { ConfigService } from '@nestjs/config';
import { UpdateCompanyDto } from './dto/request/update-company.dto';
import { SetupCompanyDto } from './dto/request/setup-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: MongoRepository<Company>,
    private configService: ConfigService,
  ) {}

  async createCompany(createCompanyDto: CreateCompanyDto) {
    const newCompany = new Company();
    newCompany.userEmail = createCompanyDto.userEmail;
    newCompany.companyName = createCompanyDto.companyName;

    const hashedPass = await bcrypt.hash(
      createCompanyDto.userPassword,
      BCRYPT_HASH_ROUND,
    );
    newCompany.userPassword = hashedPass;
    const secretKey = this.configService.get('SECRET_KEY');
    const apiKey = generateApiKey(createCompanyDto.companyName, secretKey);
    newCompany.apiKey = apiKey;
    newCompany.isSetup = false;
    await this.companyRepository.save(newCompany);
    return newCompany;
  }

  async findAllCompanies() {
    return await this.companyRepository.find();
  }

  async findOne(id: string) {
    return await this.companyRepository.findOneBy({
      id: id,
    });
  }

  async findCompanyByApiKey(apiKey: string) {
    try {
      const secretKey = this.configService.get('SECRET_KEY');
      const companyName = decryptApiKey(apiKey, secretKey);
      const company = await this.companyRepository.findOneBy({
        companyName: companyName,
      });
      if (company.isSetup) {
        throw new UnauthorizedException('API Key has been used already');
      }
      return company;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Wrong API Key');
    }
  }

  updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  async setupCompany(setupCompanyDto: SetupCompanyDto) {
    const secretKey = this.configService.get('SECRET_KEY');
    const companyName = decryptApiKey(setupCompanyDto.apiKey, secretKey);
    const company = await this.companyRepository.findOneBy({
      companyName: companyName,
    });
    company.isSetup = true;
    await this.companyRepository.save(company);
  }

  async remove(id: number) {
    const deleteResponse = await this.companyRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
