import { ObjectType, Field } from "type-graphql";
import {Funds, Sector, Shares, StockFluctuation} from "../../../../../packages/database"

@ObjectType({ description: "The company class" })
export class Company {
    @Field({ nullable: true })
    msg: String
    @Field({ nullable: true })
    status: Number
    @Field({ nullable: true })
    id?: String
    @Field({ nullable: true })
    createdAt?: String
    @Field({ nullable: true })
    updatedAt?: String
    @Field({ nullable: true })
    name?: String
    @Field({ nullable: true })
    discription?: String
    @Field({ nullable: true })
    primarySector?: Sector
    @Field({ nullable: true })
    secondarySector?: Sector
    @Field({ nullable: true })
    index?: Number
    @Field({ nullable: true })
    funds?: Funds
    @Field({ nullable: true })
    shares?: Shares
    @Field({ nullable: true })
    fluctuation?: StockFluctuation
    @Field(() => [Query], { nullable: true })
    Query?: [Query]

}



@ObjectType({ description: "The user connection class" })
export class Query {
    @Field({ nullable: true })
    msg: String
    @Field({ nullable: true })
    status: Number
    @Field({ nullable: true })
    id: String
    @Field({ nullable: true })
    createdAt: String
    @Field({ nullable: true })
    verifiedAt: String
    @Field({ nullable: true })
    question: String
    @Field({ nullable: true })
    isAnswered: Boolean
    @Field({ nullable: true })
    accurasy: Number
}