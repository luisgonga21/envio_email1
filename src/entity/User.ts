import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Timestamp,
    UpdateDateColumn,
} from "typeorm";

@Entity("user")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({
        type:"varchar",
        nullable: false,
    })
    name: string;

    @Column({
        type:"varchar",
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type:"varchar",
        nullable: false,
    })
    password: string;

    @CreateDateColumn()
    createdAt: Timestamp;

    @UpdateDateColumn()
    updatedAt: Timestamp;
}

export default User;

