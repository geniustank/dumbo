import { ObjectType, Field } from "type-graphql";
import { Sector, StockFluctuation } from "../../../../../packages/database";

@ObjectType()
class Funds {
  @Field({ nullable: true })
  rawValue: Number;
  @Field({ nullable: true })
  value: String;
  @Field({ nullable: true })
  allocatedAt: String;
}

@ObjectType()
class Shares {
  @Field({ nullable: true })
  number: Number;
  @Field({ nullable: true })
  basePrice: Number;
  @Field({ nullable: true })
  allocatedAt: String;
}
@ObjectType({ description: "The company class" })
export class Company {
  @Field({ nullable: true })
  msg: String;
  @Field({ nullable: true })
  status: Number;
  @Field({ nullable: true })
  id?: String;
  @Field({ nullable: true })
  createdAt?: String;
  @Field({ nullable: true })
  updatedAt?: String;
  @Field({ nullable: true })
  name?: String;
  @Field({ nullable: true })
  discription?: String;
  @Field({ nullable: true })
  primarySector?: Sector;
  @Field({ nullable: true })
  secondarySector?: Sector;
  @Field({ nullable: true })
  index?: Number;
  @Field(() => Funds, { nullable: true })
  funds?: Funds;
  @Field(() => Shares, { nullable: true })
  shares?: Shares;
  @Field(() => [Questions], { nullable: true })
  Query?: [Questions];
}

@ObjectType({ description: "The user connection class" })
export class Questions {
  @Field({ nullable: true })
  msg: String;
  @Field({ nullable: true })
  status: Number;
  @Field({ nullable: true })
  id: String;
  @Field({ nullable: true })
  createdAt: String;
  @Field({ nullable: true })
  verifiedAt: String;
  @Field({ nullable: true })
  question: String;
  @Field({ nullable: true })
  isAnswered: Boolean;
  @Field({ nullable: true })
  accurasy: Number;
}
