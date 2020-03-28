/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Menu from './menu.entity';

/**
 * A Item.
 */
@Entity('item')
export default class Item extends BaseEntity {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ type: 'float', name: 'price', nullable: false })
  price: number;

  @Column({ name: 'description', length: 200 })
  description: string;

  @Column({ type: 'boolean', name: 'active', nullable: false })
  active: boolean;

  @Column({ name: 'image', length: 200, nullable: false })
  image: string;

  @ManyToOne(type => Menu)
  menu: Menu;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
