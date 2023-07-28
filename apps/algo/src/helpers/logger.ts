import { MiddlewareFn } from "type-graphql";
import chalk from "chalk";

// Helper function to format the current date and time
function getFormattedDateTime() {
  const date = new Date();
  return `${date.toISOString()}`;
}

// Middleware logger
export const LoggerMiddleware: MiddlewareFn<any> = async ({ info }, next) => {
  const start = Date.now();
  const resolverName = info.parentType.name + "." + info.fieldName;

  console.log(
    chalk.bold.blue(`[GraphQL Request]`),
    chalk.gray(getFormattedDateTime())
  );
  console.log(chalk.green(`[Resolver]`), chalk.cyan(resolverName));
  console.log(
    chalk.yellow(`[Arguments]`),
    chalk.magenta(JSON.stringify(info.variableValues))
  );

  await next();

  const resolveTime = Date.now() - start;
  console.log(
    chalk.bold.blue(`[GraphQL Response]`),
    chalk.gray(getFormattedDateTime())
  );
  console.log(chalk.green(`[Resolver]`), chalk.cyan(resolverName));
  console.log(
    chalk.yellow(`[Response]`),
    chalk.magenta(JSON.stringify(info.returnType))
  );
  console.log(
    chalk.bold.green(`[Resolve Time]`),
    chalk.bold.magenta(`${resolveTime}ms`)
  );
};
