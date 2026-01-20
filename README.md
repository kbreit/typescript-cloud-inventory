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

## Project Setup (To Be Implemented)

### Prerequisites
- Node.js 18 or higher
- AWS account with configured credentials
- npm or yarn package manager

### Installation
```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Run in development mode
npm run dev

# Run compiled version
npm start
```

### Configuration

#### AWS Credentials
The tool uses the standard AWS credential chain:
1. Environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`)
2. AWS credentials file (`~/.aws/credentials`)
3. IAM role (if running on EC2/ECS)

#### AWS Profile
Use the `--profile` flag to specify a named profile from `~/.aws/credentials`.

## Usage Examples

```bash
# List EC2 instances in us-east-1 (table format)
npm start ec2 --region us-east-1

# List EC2 in all regions (JSON format)
npm start ec2 --all-regions --format json

# Use specific AWS profile (CSV format)
npm start ec2 --region eu-west-1 --profile production --format csv

# Get help
npm start --help
npm start ec2 --help
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
