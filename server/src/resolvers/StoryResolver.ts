import { Story } from "../entity/Story";
import { Query, Resolver } from "type-graphql";
// import { isAuth, isUser } from "../helpers/authHelpers";
// import { AuthContext } from "../AuthContext";
// import { FileUpload, GraphQLUpload } from 'graphql-upload'

@Resolver(Story)
export class StoryResolver {

    @Query(() => [Story])
    async stories(): Promise<Array<Story>> {
        return Story.find({})
    }

    // @Mutation(() => Story)
    // @UseMiddleware(isAuth)
    // async addStory(
    //     @Arg("contentType", () => String) contentType: ContentType
    //     @Arg("file", () => GraphQLUpload) { createReadStream, filename }: FileUpload,
    //     @Ctx() { payload } : AuthContext
    // ) : Promise<Story>{
    //     const user = await isUser(payload?.userId);

    //     if (!user) {
    //         throw new AuthenticationError("You are not a User yet");
    //     }

    //     createReadStream().pipe()

    //     const story = new Story({ contentType, })
    // }
}