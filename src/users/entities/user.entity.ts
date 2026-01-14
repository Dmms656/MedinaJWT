import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index
} from 'typeorm';

@Entity('users')
export class User {


    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    lastName: string;


    @Index({ unique: true })
    @Column({
        type: 'varchar',
        length: 150,
        nullable: false,
        unique: true
    })
    email: string;



    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        select: false
    })
    password: string;



    @Column({
        type: 'boolean',
        default: true
    })
    isActive: boolean;



    @Column({
        type: 'enum',
        enum: ['ADMIN', 'USER', 'MODERATOR'],
        default: 'USER'
    })
    role: string;


    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp'
    })
    updatedAt: Date;



    @DeleteDateColumn({
        type: 'timestamp',
        nullable: true
    })
    deletedAt?: Date;



    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    phone?: string;

    @Column({
        type: 'date',
        nullable: true
    })
    birthDate?: Date;

}
