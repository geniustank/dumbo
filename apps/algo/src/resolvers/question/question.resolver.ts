import { Resolver, Query, Arg } from "type-graphql";
import {
  AnswerCheckPrompt,
  QuestionGenPrompt,
  llm,
} from "../../helpers/openai";
import { prisma } from "../../lib";

@Resolver()
export class Question {
  @Query(() => String)
  async genQuestion(
    @Arg("group") group: string,
    @Arg("email") email: string,
    @Arg("idea") idea: string
  ) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return "gay";

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
    if (!query) return "bhk";
    console.log(query);
    const isQuery = query.find((q) => q.isAnswered == false);
    if (isQuery) {
      console.log(isQuery);
      return "query already pending";
    }
    const question = await QuestionGenPrompt.format({
      group: group,
      idea: idea,
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
    @Arg("idea") idea: string,
    @Arg("answer") answer: string,
    @Arg("question") question: string
  ) {
    console.log(group, idea, question, answer);
    const query = await AnswerCheckPrompt.format({
      group: group,
      idea: idea,
      question: question,
      answer: answer,
    });
    console.log(query);

    const score = await llm.call(query);
    console.log(score);
    return "hi";
  }
}
