import { Company, Sector } from "database";
import { prisma } from "../lib";

export async function manipulateOpinion(parent: Company, rating: number, parentIndex: string, primarySector: Sector, secondarySector: Sector) {
    const fluc = calculateValue(rating)
    
    const companies = await prisma.company.findMany();


 
}




function calculateValue(input: number): number {
    if (input >= 10) {
      return 0;
    } else if (input >= 7 && input <= 8) {
      return 0;
    } else if (input >= 5 && input <= 6) {
      return 20;
    } else if (input >= 3 && input <= 4) {
      return 30;
    } else if (input < 4) {
      return 40;
    } else {
      return 0;
    }
  }
  