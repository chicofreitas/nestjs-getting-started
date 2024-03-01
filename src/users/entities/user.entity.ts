import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { 
        length: 200, 
        unique: true, 
        nullable: false,
        comment: "Username used to login the application."
    })
    username: string;

    @Column("varchar", { 
        length: 200, 
        unique: true, 
        nullable: false
    })
    password: string;
}
