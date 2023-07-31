import { Sector } from "database";
import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { prisma } from "../../lib";
import { Company } from "./compnay.types";

@Resolver()
export class CompanyClass {
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
    @Arg("fund") fund: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return {
        msg: "No user found",
        status: 200,
      };

    const compnayVal = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (compnayVal) {
      return {
        msg: "company already made",
        status: 200,
      };
    }

    const index = (await prisma.company.findMany()).length + 1;

    const createdcompany = await prisma.company.create({
      data: {
        name,
        discription,
        primarySector,
        secondarySector,
        index,
        funds: {
          value: fund,
          rawValue: Number(fund),
        },
        shares: {
          number: Number(fund) / 100,
        },
        userId: user.id,
      },
    });
    console.log(createdcompany);
    return {
      msg: "company created",
      status: 200,
      name: createdcompany.name,
      discription: createdcompany.discription,
      primarySector: createdcompany.primarySector,
      secondarySector: createdcompany.secondarySector,
      index: createdcompany.index,
      id: createdcompany.id,
      funds: createdcompany.funds,
      shares: createdcompany.shares,
      createdAt: createdcompany.createdAt,
      updatedAt: createdcompany.updatedAt,
    };
  }
  @Query(() => Company)
  async getCompany(
    @Arg("email") email: string,
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return {
        msg: "No user found",
        status: 200,
      };

    const compnayVal = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (!compnayVal) {
      return {
        msg: "No company found",
        status: 200,
      };
    }

    return {
      msg: "company found",
      status: 200,
      name: compnayVal.name,
      discription: compnayVal.discription,
      primarySector: compnayVal.primarySector,
      secondarySector: compnayVal.secondarySector,
      index: compnayVal.index,
      id: compnayVal.id,
      funds: compnayVal.funds,
      shares: compnayVal.shares,
      createdAt: compnayVal.createdAt,
      updatedAt: compnayVal.updatedAt,
    };
  }

}
