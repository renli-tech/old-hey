import { User } from "../entity/User";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { CheckIfUserAlreadyExist } from "../helpers/authHelpers";
import { AuthenticationError } from "apollo-server-errors";
import { compare, hash } from "bcryptjs";


@ObjectType()
class AuthResponse {

    @Field()
    user: User
}

@Resolver(User)
class UserResolver {

    @Query(() => [User])
    async users(
        @Arg("take", { nullable : true }) take? : number
    ): Promise<Array<User>> {
        return await User.find({ take })
    }
    
    @Mutation(() => AuthResponse)
    async createUser(
        @Arg("fullname") fullname: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
    ): Promise<AuthResponse> {
        const alreadyExist = await CheckIfUserAlreadyExist(email);

        if (alreadyExist) {
            throw new AuthenticationError(`User with ${email} already exits`)
        }

        const hashedPassword = await hash(password, 12);

        const user = new User({ fullname, email, password: hashedPassword });
        
        await user.save();
        
        return {
            user
        }
    }

    @Mutation(() => AuthResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password : string
    ): Promise<AuthResponse> {
        const exists = await CheckIfUserAlreadyExist(email);

        if (!exists) {
            throw new AuthenticationError(`User with Email ${email} doesn't exist`);
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error("User not Found");
        }

        const passwordIsCorrect = await compare(password, user.password);

        if (!passwordIsCorrect) {
            throw new AuthenticationError("Incorrect Password");
        }

        return {
            user : user
        }

    }
}

export default UserResolver;