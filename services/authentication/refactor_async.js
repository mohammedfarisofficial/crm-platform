const fs = require('fs');

function refactorFile(path) {
  let code = fs.readFileSync(path, 'utf8');

  // Add asyncHandler import if not there
  if (!code.includes('asyncHandler')) {
    if (code.includes('@crm/http-server')) {
      code = code.replace(/import { (.*) } from '@crm\/http-server';/, "import { $1, asyncHandler } from '@crm/http-server';");
    } else {
      code = "import { asyncHandler } from '@crm/http-server';\n" + code;
    }
  }

  // Find all function definitions and replace them
  // This is a naive but effective regex for the specific structure of mutate.ts and query.ts
  const functionRegex = /(\w+):\s*async\s*\(req:\s*Request,\s*res:\s*Response\)(?::\s*Promise<void>)?\s*=>\s*\{\s*try\s*\{([\s\S]*?)\}\s*catch\s*\([^)]*\)\s*\{\s*[\s\S]*?\n\s*\}\s*\}/g;

  code = code.replace(functionRegex, (match, fnName, tryBody) => {
    // Remove the extra indentation from tryBody
    const unindentedBody = tryBody.replace(/\n    /g, '\n');
    return `${fnName}: asyncHandler(async (req: Request, res: Response) => {${unindentedBody}})`
  });

  fs.writeFileSync(path, code);
}

refactorFile('src/controllers/v1/mutate.ts');
refactorFile('src/controllers/v1/query.ts');
console.log('Refactoring complete!');
