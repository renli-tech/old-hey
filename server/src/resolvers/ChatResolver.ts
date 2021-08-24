import { Chat } from "../entity/Chat";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { User } from "../entity/User";
import { AuthContext } from "../AuthContext";
import { isAuth, isUser } from "../helpers/authHelpers";
import { AuthenticationError } from "apollo-server-core";

@Resolver(Chat)
export class ChatResolver {

    @FieldResolver(() => User, { nullable : true})
    async from(@Root() chat : Chat) : Promise<User | null>{
        const user = await User.findOne(chat.fromID);

        if (!user) return null;

        return user;
    }

    @FieldResolver(() => User, { nullable : true})
    async to(@Root() chat : Chat) : Promise<User | null>{
        const user = await User.findOne(chat.toID);

        if (!user) return null;

        return user;
    }

    @Query(() => Chat)
    @UseMiddleware(isAuth)
    async sendMessage(
        @Arg("to") toID : string,
        @Arg("content") content : string,
        @Ctx() { payload } : AuthContext
        ) : Promise<Chat> {
        const user = await isUser(payload?.userId);

        if (!user) {
            throw new AuthenticationError("You are not a User yet");
        }
        const chat = new Chat({ content, toID, fromID : user.id.toString()})

        return chat;
    }
}