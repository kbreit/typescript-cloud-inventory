# Cloud Resource Inventory CLI

A TypeScript-based CLI tool for querying cloud infrastructure resources and generating inventory reports.

## Typical TypeScript Application Structure

```
typescript-demo/
├── src/                          # Source code
│   ├── index.ts                  # Main entry point / CLI setup
│   ├── commands/                 # CLI command handlers
│   │   ├── ec2.ts                # EC2 inventory command
│   │   └── index.ts              # Command exports
│   ├── services/                 # Business logic / AWS clients
│   │   ├── aws-client.ts         # AWS SDK client initialization
│   │   ├── ec2-service.ts        # EC2-specific operations
│   │   └── index.ts              # Service exports
│   ├── formatters/               # Output formatting logic
│   │   ├── json-formatter.ts     # JSON output
│   │   ├── table-formatter.ts    # Table output
│   │   ├── csv-formatter.ts      # CSV output
│   │   └── index.ts              # Formatter exports
│   ├── types/                    # TypeScript type definitions
│   │   ├── inventory.ts          # Inventory item interfaces
│   │   ├── config.ts             # Configuration types
│   │   └── index.ts              # Type exports
│   └── utils/                    # Utility functions
│       ├── error-handler.ts      # Error handling utilities
│       ├── logger.ts             # Logging utilities
│       └── index.ts              # Utility exports
├── dist/                         # Compiled JavaScript (generated)
├── node_modules/                 # Dependencies (generated)
├── tests/                        # Test files (mirrors src structure)
│   ├── services/
│   │   └── ec2-service.test.ts
│   └── formatters/
│       └── json-formatter.test.ts
├── .gitignore                    # Git ignore rules
├── package.json                  # Project metadata and dependencies
├── package-lock.json             # Locked dependency versions
├── tsconfig.json                 # TypeScript compiler configuration
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── REQUIREMENTS.md               # Project requirements document
└── README.md                     # This file

```

## Key TypeScript Concepts Demonstrated

### 1. **Type Definitions** (`src/types/`)
Define interfaces and types for data structures:
```typescript
interface EC2Instance {
  instanceId: string;
  instanceType: string;
  state: string;
  name?: string;
  launchTime?: Date;
}
```

### 2. **Services** (`src/services/`)
Business logic with strong typing:
```typescript
class EC2Service {
  async listInstances(region: string): Promise<EC2Instance[]> {
    // AWS SDK calls with proper typing
  }
}
```

### 3. **Commands** (`src/commands/`)
CLI command handlers that orchestrate services and formatters:
```typescript
async function handleEC2Command(options: CommandOptions): Promise<void> {
  const service = new EC2Service();
  const instances = await service.listInstances(options.region);
  // Format and output
}
```

### 4. **Formatters** (`src/formatters/`)
Transform data into different output formats:
```typescript
function formatAsTable(instances: EC2Instance[]): string {
  // Convert typed data to table
}
```

## Project Setup

### Prerequisites
- Node.js 18 or higher
- AWS account with configured credentials
- npm package manager
- AWS CLI configured (optional, but recommended)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd typescript-demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile TypeScript**
   ```bash
   npm run build
   ```

4. **Verify installation**
   ```bash
   npm start -- ec2 --help
   ```

### Configuration

#### AWS Credentials

The tool uses the standard AWS credential chain (in order of precedence):
1. Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
2. AWS credentials file (`~/.aws/credentials`)
3. IAM role (if running on EC2/ECS/Lambda)

**To configure credentials:**

Using AWS CLI (recommended):
```bash
aws configure
```

Or manually create `~/.aws/credentials`:
```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY

[production]
aws_access_key_id = PROD_ACCESS_KEY
aws_secret_access_key = PROD_SECRET_KEY
```

#### AWS Profile

Use the `--profile` flag to specify a named profile from `~/.aws/credentials`:
```bash
npm start -- ec2 --region us-east-1 --profile production
```

#### Required IAM Permissions

The tool requires the following IAM permissions:
- `ec2:DescribeInstances` - For listing EC2 instances
- `ec2:DescribeRegions` - For querying multiple regions (optional)

## Usage Examples

### Basic Commands

**List EC2 instances in a single region (table format - default)**
```bash
npm start -- ec2 --region us-east-1
```
Output:
```
┌─────────────────────┬────────┬──────────┬─────────┐
│ ID                  │ Name   │ Type     │ State   │
├─────────────────────┼────────┼──────────┼─────────┤
│ i-04d5ea5b5d938f1e4 │ TSDemo │ t3.micro │ stopped │
└─────────────────────┴────────┴──────────┴─────────┘
```

**List EC2 instances in all US regions**
```bash
npm start -- ec2 --all-regions
```

**Use specific AWS profile**
```bash
npm start -- ec2 --region us-east-1 --profile production
```

### Output Formats

**JSON format** (useful for piping to other tools)
```bash
npm start -- ec2 --region us-east-1 --format json
```
Output:
```json
[
  {
    "id": "i-04d5ea5b5d938f1e4",
    "type": "t3.micro",
    "state": "stopped",
    "name": "TSDemo"
  }
]
```

**CSV format** (useful for spreadsheet import)
```bash
npm start -- ec2 --region us-east-1 --format csv
```
Output:
```csv
ID,Name,Type,State
i-04d5ea5b5d938f1e4,TSDemo,t3.micro,stopped
```

**Table format** (default, human-readable)
```bash
npm start -- ec2 --region us-east-1 --format table
# or simply
npm start -- ec2 --region us-east-1
```

### Getting Help

**General help**
```bash
npm start -- --help
```

**EC2 command help**
```bash
npm start -- ec2 --help
```

### Available Regions

The `--all-regions` flag queries these US regions:
- us-east-1 (N. Virginia)
- us-east-2 (Ohio)
- us-west-1 (N. California)
- us-west-2 (Oregon)
- us-gov-west-1 (GovCloud West) *
- us-gov-east-1 (GovCloud East) *

\* GovCloud regions require special AWS GovCloud credentials

## Troubleshooting

### Common Errors

**"Credential error: ..."**
- **Cause**: AWS credentials not found or invalid
- **Solution**:
  - Run `aws configure` to set up credentials
  - Verify credentials file exists at `~/.aws/credentials`
  - Check environment variables `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
  - Verify the IAM user has programmatic access enabled

**"Authentication error: Authentication failure"**
- **Cause**: Credentials are found but authentication failed
- **Solution**:
  - Verify your AWS access key and secret key are correct
  - Check if the IAM user is active and not disabled
  - For GovCloud regions, ensure you're using GovCloud credentials
  - Try running `aws sts get-caller-identity` to verify credentials

**"Access denied error: ..."**
- **Cause**: IAM user/role lacks required permissions
- **Solution**:
  - Add `ec2:DescribeInstances` permission to your IAM policy
  - Example minimal IAM policy:
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "ec2:DescribeInstances",
            "ec2:DescribeRegions"
          ],
          "Resource": "*"
        }
      ]
    }
    ```

**"Option error: Either --all-regions or --region must be specified"**
- **Cause**: Missing required flag
- **Solution**: Provide either `--region <region-name>` or `--all-regions`

**"Option error: --all-regions and --region are mutually exclusive"**
- **Cause**: Both flags provided simultaneously
- **Solution**: Use only one flag: either `--region` OR `--all-regions`

**"Region error: Invalid region"**
- **Cause**: Specified region is not in the supported US regions list
- **Solution**: Use one of the supported regions:
  - us-east-1, us-east-2, us-west-1, us-west-2
  - For other regions, modify the region list in `src/commands/ec2.ts`

**"Format error: Incorrect format"**
- **Cause**: Invalid output format specified
- **Solution**: Use one of the supported formats: `json`, `csv`, or `table`

**"Rate limit error: ..."**
- **Cause**: AWS API rate limits exceeded
- **Solution**:
  - Wait a few minutes and try again
  - Reduce the number of regions queried
  - Use `--region` instead of `--all-regions`

### GovCloud Regions

If using `--all-regions` with standard AWS credentials, you'll see authentication errors for GovCloud regions. This is expected behavior. Options:
1. Remove GovCloud regions from the list in `src/commands/ec2.ts`
2. Use GovCloud-specific credentials when querying those regions
3. Ignore the GovCloud authentication errors (other regions will still work)

### Debugging

**Enable verbose logging**
```bash
# Set AWS SDK debug mode
export AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE=1
export ACTIONS_STEP_DEBUG=true
npm start -- ec2 --region us-east-1
```

**Verify AWS CLI works**
```bash
# Test AWS credentials
aws sts get-caller-identity

# Test EC2 access
aws ec2 describe-instances --region us-east-1
```

**Check TypeScript compilation**
```bash
npm run build
# Check dist/ directory was created
ls -la dist/
```

## Development Workflow

### File Organization Principles
- **One concern per file**: Each file has a single, clear responsibility
- **Index files**: Each directory has an `index.ts` that exports public APIs
- **Type safety first**: Define types before implementing logic
- **Separation of concerns**: CLI → Commands → Services → AWS SDK

### TypeScript Configuration (`tsconfig.json`)
- **strict mode**: Enables all strict type checking
- **target**: ES2020 or later for modern JavaScript features
- **module**: CommonJS or ESNext depending on needs
- **outDir**: `./dist` for compiled output
- **rootDir**: `./src` for source files

### Development Commands
```bash
npm run dev          # Run with ts-node (no compilation)
npm run build        # Compile TypeScript to JavaScript
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm test             # Run tests
```

## Learning Path

As you build this project, you'll learn TypeScript concepts in this order:
1. **Basic types**: string, number, boolean, arrays
2. **Interfaces**: Defining object shapes
3. **Functions**: Parameter and return types
4. **Async/await**: Promise typing
5. **Generics**: Reusable type-safe functions
6. **Union types**: Multiple possible types
7. **Type guards**: Runtime type checking
8. **Enums**: Named constants

## Comparison to Python

| Python | TypeScript |
|--------|-----------|
| `def func(name: str) -> str:` | `function func(name: string): string` |
| `List[str]` | `string[]` or `Array<string>` |
| `Dict[str, int]` | `{ [key: string]: number }` or `Record<string, number>` |
| `Optional[str]` | `string \| undefined` or `string?` |
| `@dataclass` | `interface` or `type` |
| `async def func():` | `async function func():` |
| `await func()` | `await func()` (same!) |

## Resources
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [AWS SDK v3 for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Node.js Documentation](https://nodejs.org/docs/latest/api/)
- [Commander.js Documentation](https://github.com/tj/commander.js)

## License
MIT
