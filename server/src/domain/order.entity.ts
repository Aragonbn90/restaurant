/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Dish from './dish.entity';

/**
 * A Order.
 */
@Entity('jhi_order')
export default class Order extends BaseEntity {
  @Column({ name: 'code', length: 20, nullable: false })
  code: string;

  @Column({ type: 'float', name: 'total', nullable: false })
  total: number;

  @Column({ type: 'float', name: 'discount', nullable: false })
  discount: number;

  @Column({ type: 'float', name: 'discount_percent', nullable: false })
  discountPercent: number;

  @Column({ type: 'float', name: 'total_after_discount', nullable: false })
  totalAfterDiscount: number;

  @Column({ name: 'description', length: 200 })
  description: string;

  @OneToMany(
    type => Dish,
    other => other.order
  )
  dishes: Dish[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
