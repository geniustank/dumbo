import { Sector } from "database";
import { Mutation, Query, Resolver, Arg} from "type-graphql";
import { prisma } from "../../lib";

@Resolver()
export class Company {
  @Query(() => String)
  async hello() {
    return "Hello";
  }

  @Mutation(() => Company)
  async createCompany(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("discription") discription: string,
    @Arg("primarySector") primarySector: Sector,
    @Arg("secondarySector") secondarySector: Sector,
    @Arg("fund") fund: string,
  ){
    const user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    if(!user) return {
      msg: "No user found",
      status: 200
    }

    const compnayVal = await prisma.company.findUnique({
      where:{
        userId: user.id
      }
    })
 
    if(compnayVal) {
     return {
      msg: "company already made",
      status: 200
     }
    }
    
    const index = (await (prisma.company.findMany())).length + 1
   
    const createdcompany = await prisma.company.create({
      data: {
        name,
        discription,
        primarySector,
        secondarySector,
        index,
        funds: {
          value: fund,
          rawValue: Number(fund)
        },
        shares: {
          number: Number(fund) / 100
        },
        userId: user.id
      }
    })
    
    console.log(createdcompany)
    return {}

  }

}
