import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {Entity, ObjectIdColumn, ObjectID, Column, BaseEntity, CreateDateColumn} from "typeorm";


interface UserInput {
    fullname: string,
    email: string,
    password: string,
}

@Entity()
@ObjectType()
export class User extends BaseEntity{

    @Field(() => String)
    @ObjectIdColumn()
    id: ObjectID;

    @Field()
    @Column()
    @IsNotEmpty()
    fullname: string;

    @Column()
    @MinLength(6, {
        message : "Password should not be less than 6 characters"
    })
    password: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    @Column()
    email: string;
    
    @Column("int", { default: 0 })
    tokenVersion: number = 0;

    @Field(() => Date)
    @CreateDateColumn()
    dateJoined : Date
    

    constructor(userInput : UserInput) {
        super();

        if (userInput) {
            this.fullname = userInput.fullname;
            this.email = userInput.email;
            this.password = userInput.password;
        }
    }

}