import { Resolver, Query, Arg } from "type-graphql";
import { AnswerCheckPrompt, QuestionGenPrompt, llm } from "../../helpers/openai";

@Resolver()
export class Question {
 @Query(() => String)
 async genQuestion(
    @Arg("group") group: string,
    @Arg("email") email: string,
    @Arg("idea") idea: string,
 ) {
  const question = await QuestionGenPrompt.format({
    group: group,
    idea: idea
  })

  const answer = await llm.call(question)
  console.log(answer)
  return "done"
 }

 @Query(() => String)
 async checkQuestion(
    @Arg("group") group: string,
    @Arg("idea") idea: string,
    @Arg("answer") answer: string,
    @Arg("question") question: string,
 ) {

    console.log(group,idea,question,answer)
  const query = await AnswerCheckPrompt.format({
    group: group,
    idea: idea,
    question: question,
    answer: answer
  })
  console.log(query)

  const score = await llm.call(query)
  console.log(score)
  return "hi"
 }

}