import os from 'os';
import chalk from 'chalk';

function getSystemInfo() {
  const osType = os.type();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const port = 8080; // You can modify this to your desired port for GraphQL

  return { osType, totalMemory, freeMemory, port };
}

export function createStartupMenu() {
  const { osType, totalMemory, freeMemory, port } = getSystemInfo();

  const banner = `
  ██████  ███████ ███    ██ ██ ██    ██ ███████     ████████  █████  ███    ██ ██   ██ 
  ██       ██      ████   ██ ██ ██    ██ ██             ██    ██   ██ ████   ██ ██  ██  
  ██   ███ █████   ██ ██  ██ ██ ██    ██ ███████        ██    ███████ ██ ██  ██ █████   
  ██    ██ ██      ██  ██ ██ ██ ██    ██      ██        ██    ██   ██ ██  ██ ██ ██  ██  
   ██████  ███████ ██   ████ ██  ██████  ███████        ██    ██   ██ ██   ████ ██   ██ 
                                                                                                                             
  `;
  const formattedBanner = chalk.yellow.bold(banner);

  const menu = `
${formattedBanner}
  Welcome to DUMBO API!

  ${chalk.yellow.bold('System Information:')}
  ${chalk.cyan('OS Type:')} ${osType}
  ${chalk.cyan('Total Memory:')} ${((totalMemory / (1024 * 1024)).toFixed(2))} MB
  ${chalk.cyan('Free Memory:')} ${((freeMemory / (1024 * 1024)).toFixed(2))} MB
  ${chalk.cyan('GraphQL Server Port:')} ${port} (uses TypeGraphQL)

  ${chalk.yellow.bold('Choose an option below:')}

  ${chalk.cyan('1.')} Start the server
  ${chalk.cyan('2.')} View documentation
  ${chalk.cyan('3.')} Exit
`;

  console.log(menu);
}

