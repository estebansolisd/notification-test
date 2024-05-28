import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'logs',
  timestamps: true
})
class Log extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  userName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  messageType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  notificationType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  sentAt!: Date;
}

export default Log;
