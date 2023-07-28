import { Query, Resolver } from "type-graphql";

@Resolver()
export class Company {
  @Query(() => String)
  async createCompany() {
    return "Hello";
  }
}
