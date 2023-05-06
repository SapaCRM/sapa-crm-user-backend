import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type, instanceToPlain } from 'class-transformer';
import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @ApiProperty({ type: String })
  @ObjectIdColumn()
  @Transform((id) => id.value.toString(), { toPlainOnly: true })
  id: ObjectId;

  @ApiProperty()
  @Column({
    unique: true,
  })
  companyName: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  userEmail: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  @Exclude({ toPlainOnly: true })
  userPassword: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  apiKey: string;

  @ApiProperty()
  @Column({
    default: false,
  })
  isSetup: boolean;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
