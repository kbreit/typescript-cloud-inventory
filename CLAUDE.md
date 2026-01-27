# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based CLI tool for querying AWS cloud infrastructure resources (starting with EC2) and generating inventory reports. The project serves as a learning tool for TypeScript fundamentals, AWS SDK v3, and CLI development patterns. It's tailored to an intermediate Python developer who is looking to expand into TypeScript as a secondary language. The intention is Claude is not doing the development but guiding the developer on what to do without always giving the answers.

## Development Commands

### Build and Run

```bash
# Compile TypeScript to JavaScript
tsc

# Run the compiled CLI (after building)
node dist/index.js

# Development mode with ts-node (no compilation needed)
ts-node src/index.ts
```

### CLI Usage

```bash
# List EC2 instances in a single region
node dist/index.js --region us-east-1

# List EC2 instances across all US regions
node dist/index.js --all-regions

# Use a specific AWS profile
node dist/index.js --region us-east-1 --profile production

# Change output format (json, csv, or table)
node dist/index.js --region us-east-1 --format json
```

## Architecture

### Layered Architecture Pattern

The codebase follows a strict separation of concerns with distinct layers:

1. **CLI Layer** (`src/commands/`) - Parses user input and orchestrates the flow
2. **Service Layer** (`src/services/`) - Contains business logic and AWS SDK interactions
3. **Formatter Layer** (`src/formatters/`) - Transforms data into output formats
4. **Type Layer** (`src/types/`) - Defines interfaces and type definitions
5. **Utility Layer** (`src/utils/`) - Error handling and shared utilities

### Data Flow

```
User Input → CLI Command → Service Layer → AWS SDK
                ↓
           EC2Instance[] ← Transform AWS Response
                ↓
           Formatter → Output (JSON/CSV/Table)
```

### Key Design Patterns

**Factory Pattern**: Used in `createEC2Client()` to create configured AWS clients with optional profile support.

**Service Class Pattern**: `EC2Service` encapsulates all EC2-related operations. The class accepts an optional AWS profile in the constructor and uses it for all subsequent operations.

**Parallel Execution**: `listAllRegions()` uses `Promise.all()` to query multiple AWS regions concurrently, then flattens results with `.flat()`.

**Error Transformation**: AWS SDK errors are caught in the service layer and transformed into custom error types (CredentialError, AuthenticationError, etc.) for better error handling at the CLI level.

## AWS Integration

### Credential Handling

The tool uses AWS SDK v3's `fromIni()` credential provider, which supports:

- Named profiles via `--profile` flag
- Default AWS credential chain (environment variables, ~/.aws/credentials, IAM roles)
- No credentials are ever hardcoded

### Client Initialization

`createEC2Client()` in `src/services/aws-client.ts` creates region-specific EC2 clients with credential provider configuration. The function is async and returns a configured EC2Client instance.

### API Response Transformation

Raw AWS responses go through a transformation pipeline:

1. Extract `Reservations[]` from `DescribeInstancesCommand` response
2. Flatten to `Instance[]` using `flatMap()`
3. Map to `EC2Instance` interface with safe navigation (`?.`) for optional fields
4. Extract Name tag from Tags array using `.find()`

## TypeScript Configuration

The project uses **strict mode** TypeScript with additional safety checks:

- `noUncheckedIndexedAccess`: Prevents unchecked array/object access
- `exactOptionalPropertyTypes`: Enforces precise optional property types
- `target: ES2020`: Enables modern JavaScript features
- `module: CommonJS`: Compatible with Node.js

Source files live in `src/`, compiled output goes to `dist/`.

## Error Handling Strategy

Custom error classes in `src/utils/error-handler.ts`:

- `CredentialError` - AWS credentials missing/invalid
- `AuthenticationError` - Authentication failed
- `AccessDeniedError` - IAM permissions insufficient
- `RateLimitError` - AWS API throttling
- `RegionError` - Invalid region specified
- `OptionError` - CLI option conflicts
- `FormatError` - Invalid output format

### Error Handling Pattern

The CLI uses a unified error handling approach in `src/commands/ec2.ts`:

1. **Async/await pattern**: All AWS operations use `await` instead of `.then()/.catch()` chains
2. **Single try-catch block**: All errors (validation, AWS, formatting) are caught in one place
3. **Type-based error handling**: Uses `instanceof` checks to provide specific error messages
4. **Clean user experience**: All errors display user-friendly messages with exit code 1, no stack traces

Example structure:
```typescript
.action(async (options) => {
  try {
    // Validation
    // AWS operations with await
    // Format and output
  } catch (err: unknown) {
    // Handle all error types with instanceof checks
    // Display clean error message
    // Exit with code 1
  }
});
```

This approach ensures consistent error handling for both synchronous validation errors and asynchronous AWS SDK errors.

## Code Organization Principles

### Index Files as Public APIs

Each directory has an `index.ts` that exports the public API. This pattern:

- Controls what's exposed from each module
- Simplifies imports (`from '../services'` instead of `from '../services/ec2-service'`)
- Allows internal refactoring without breaking imports

### Type Safety First

All functions have explicit parameter and return types. The `EC2Instance` interface defines the canonical shape of instance data throughout the application.

### Async/Await Throughout

All I/O operations use async/await. The service layer methods return `Promise<EC2Instance[]>`, and errors are handled with try/catch blocks.

## Current Limitations

- Only supports EC2 instances (S3, RDS, Lambda not yet implemented)
- Only queries US regions (hardcoded in `src/commands/ec2.ts`)
- GovCloud regions included in `--all-regions` require special credentials
- No pagination for large result sets
- No automated tests yet
- No ESLint configuration file (despite eslint being in devDependencies)

## Known Issues

1. **GovCloud Authentication** (src/commands/ec2.ts:24)
   - `--all-regions` includes us-gov-west-1 and us-gov-east-1
   - These regions require special GovCloud AWS credentials
   - Standard AWS credentials will fail with "Authentication error: Authentication failure"
   - Consider removing GovCloud regions or adding `--include-govcloud` flag

## Testing Status

**Tested and Working:**
- ✅ Build process (`npm run build`)
- ✅ Single region queries (us-east-1)
- ✅ All three output formats (table, JSON, CSV)
- ✅ AWS credential authentication
- ✅ All error handling scenarios display clean error messages:
  - ✅ Invalid format error
  - ✅ Invalid region error
  - ✅ Conflicting flags error
  - ✅ Missing flags error
  - ✅ GovCloud authentication error
  - ✅ AWS credential errors
  - ✅ Access denied errors
  - ✅ Rate limit errors

**Known Limitations:**
- ⚠️ `--all-regions` fails on GovCloud regions without GovCloud credentials (expected behavior)

## Important Files

- `src/commands/ec2.ts` - CLI command handler with Commander.js, contains all option parsing and validation
- `src/services/ec2-service.ts` - EC2Service class with `listInstances()` and `listAllRegions()` methods
- `src/services/aws-client.ts` - Factory function for creating configured EC2 clients
- `src/formatters/index.ts` - `formatOutput()` factory function that routes to JSON/CSV/Table formatters
- `src/types/inventory.ts` - Core EC2Instance interface definition
- `REQUIREMENTS.md` - Detailed project requirements and learning objectives
- `TODO.md` - Comprehensive implementation checklist with current status
