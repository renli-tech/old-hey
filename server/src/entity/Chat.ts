import { IsNotEmpty } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { User } from "./User";

interface ChatOptions {
    toID: string;
    fromID:string;
    content : string;
}
@Entity()
@ObjectType()
export class Chat extends BaseEntity{

    @Field(() => String)
    @ObjectIdColumn()
    id: ObjectID;

    @Field(() => String)
    @Column()
    @IsNotEmpty()
    content: string;

    @Column()
    fromID: string;

    @Field(() => User)
    from: User;

    @Column()
    toID: string;

    @Field(() => User)
    to: User;

    @CreateDateColumn()
    dateSent: Date;

    constructor(chatOptions : ChatOptions){
        super();

        if(chatOptions){
            this.toID = chatOptions.toID;
            this.fromID = chatOptions.fromID;
            this.content = chatOptions.content;
        }
    }
}