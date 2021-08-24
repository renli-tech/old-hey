import { ChatResolver } from "./ChatResolver";
import { StoryResolver } from "./StoryResolver";
import UserResolver from "./UserResolver";

const RootResolver : readonly[Function, ...Function[]] | [Function, ...Function[]] | readonly[string, ...string[]] | [string, ...string[]] =[
    UserResolver,
    ChatResolver,
    StoryResolver
]

export default RootResolver;