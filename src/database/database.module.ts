import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGO_DB_URL'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
