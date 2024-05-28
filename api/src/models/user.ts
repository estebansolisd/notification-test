import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false
})
class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phoneNumber!: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
  })
  subscribed!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false
  })
  channels!: string[];
}

export default User;