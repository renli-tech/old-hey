import UserResolver from "./UserResolver";

const RootResolver : readonly[Function, ...Function[]] | [Function, ...Function[]] | readonly[string, ...string[]] | [string, ...string[]] =[
    UserResolver
]

export default RootResolver;