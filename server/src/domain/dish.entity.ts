/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Order from './order.entity';

/**
 * A Dish.
 */
@Entity('dish')
export default class Dish extends BaseEntity {
  @Column({ type: 'float', name: 'price', nullable: false })
  price: number;

  @Column({ name: 'description', length: 500 })
  description: string;

  @ManyToOne(type => Order)
  order: Order;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
