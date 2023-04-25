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
  @ObjectIdColumn()
  id: ObjectId;

  @Column({
    unique: true,
  })
  companyName: string;

  @Column({
    unique: true,
  })
  userEmail: string;

  @Column({
    unique: true,
  })
  userPassword: string;

  @Column({
    unique: true,
  })
  apiKey: string;

  @Column({
    default: false,
  })
  isSetup: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
