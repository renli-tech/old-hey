import { Field, ObjectType } from "type-graphql";
import { CreateDateColumn, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Chat {

    @Field(() => String)
    @ObjectIdColumn()
    id : ObjectID

    from : User

    to : User

    @CreateDateColumn()
    dateSent : Date
}