/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import Item from './item.entity';

/**
 * A Menu.
 */
@Entity('menu')
export default class Menu extends BaseEntity {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 200 })
  description: string;

  @OneToMany(
    type => Item,
    other => other.menu
  )
  items: Item[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
