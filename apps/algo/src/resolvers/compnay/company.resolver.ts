import { Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class Company {
  @Query(() => String)
  async hello() {
    return "Hello";
  }

  @Mutation(() => )
  async createCompany(){

  }
}
