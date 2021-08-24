import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { User } from "./User";

export type ContentType = "Image" | "Video";

interface StoryOptions {
    postedByID: string;
    contentType: ContentType;
    contentUrl: string;
}

@Entity()
@ObjectType()
export class Story extends BaseEntity{

    @Field(() => String)
    @ObjectIdColumn()
    id : ObjectID;

    @Field(() => String)
    @Column(() => String)
    contentType: ContentType;

    @Field(() => User)
    postedBy: User;

    @Field(() => String)
    @Column()
    postedByID: string;

    @Field(() => String)
    @Column()
    contentUrl: string;

    constructor(storyOptions : StoryOptions){
        super();

        if(storyOptions){
            this.contentType = storyOptions.contentType;
            this.contentUrl = storyOptions.contentUrl;
            this.postedByID = storyOptions.postedByID;
        }
    }
}