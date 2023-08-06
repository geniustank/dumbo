import { Resolver, Query, Arg } from "type-graphql";
import {
  AnswerCheckPrompt,
  QuestionGenPrompt,
  llm,
} from "../../helpers/openai";
import { prisma } from "../../lib";
import { manipulateOpinion } from "../../helpers/chainOpinion";

@Resolver()
export class Question {
  @Query(() => String)
  async genQuestion(
    @Arg("group") group: string,
    @Arg("email") email: string,
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return "no user";

    const compnayVal = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!compnayVal) return "no company";
    console.log(compnayVal);
    const query = await prisma.question.findMany({
      where: {
        companyId: compnayVal.id,
      },
    });
    if (!query) return "no query";
    console.log(query);
    const isQuery = query.find((q) => q.isAnswered == false);
    if (isQuery) {
      console.log(isQuery);
      return "query already pending";
    }
    const question = await QuestionGenPrompt.format({
      group: group,
      idea: compnayVal.discription,
    });

    const qnaquery = await llm.call(question);
    const createQuery = await prisma.question.create({
      data: {
        question: qnaquery,
        companyId: compnayVal.id,
      },
    });
    console.log(createQuery);
    console.log(qnaquery);
    return "done";
  }

  @Query(() => String)
  async checkQuestion(
    @Arg("group") group: string,
    @Arg("email") email: string,
    @Arg("answer") answer: string,
  ) {
    const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) return "no user";
  
      const compnayVal = await prisma.company.findUnique({
        where: {
          userId: user.id,
        },
      });
      if (!compnayVal) return "bhak madherchod";
      console.log(compnayVal);

      const query = await prisma.question.findMany({
        where: {
          companyId: compnayVal.id,
        },
      });
    const isQuery = query.find((q) => q.isAnswered == false);
    if (!isQuery) {
      console.log(isQuery);
      return "query not there create a query";
    }
    const prompt = await AnswerCheckPrompt.format({
      group: group,
      idea: compnayVal.discription,
      question: isQuery.question,
      answer: answer,
    });
    console.log(prompt);

    const score = await llm.call(prompt);
    console.log(score);

    const updatedQuestion = await prisma.question.update({
        where: {
            id: isQuery.id
        },
        data: {
            accurasy: Number(score),
            isAnswered: true
        }
    })
    console.log(updatedQuestion)
    return "hi";
  }
  @Query(() => String)
  async question() {
   return "o"
  }
}
