# Cloud Resource Inventory CLI - Implementation Todo List

## Current Status
**Last Updated:** 2026-01-24 at 17:16

**Completed:**
- ✅ package.json fully configured (name: typescript-cloud-inventory, author: Kevin Breit, main: dist/index.js, version: 0.0.0)
- ✅ All development dependencies installed:
  - TypeScript v5.9.3
  - ts-node v10.9.2
  - @types/node v25.0.9
  - eslint v9.39.2 + TypeScript plugins
  - prettier v3.8.0
- ✅ tsconfig.json created with:
  - strict mode enabled
  - target: ES2020
  - module: CommonJS
  - moduleResolution: node
  - rootDir: ./src, outDir: ./dist
  - sourceMap enabled
  - esModuleInterop enabled
  - resolveJsonModule enabled
  - types: ["node"] configured
- ✅ Project directory structure created:
  - src/commands/, src/services/, src/formatters/, src/types/, src/utils/
- ✅ AWS SDK and CLI dependencies installed:
  - @aws-sdk/client-ec2 v3.972.0
  - @aws-sdk/credential-providers v3.972.0
  - commander v14.0.2
  - cli-table3 v0.6.5
- ✅ Type definitions created:
  - EC2Instance interface (src/types/inventory.ts)
  - OutputFormat type (src/types/config.ts)
  - Barrel exports (src/types/index.ts)
- ✅ AWS client service implemented:
  - createEC2Client factory function
  - Supports optional profile selection
  - Dynamic region configuration
- ✅ EC2 service fully implemented:
  - ✅ EC2Service class created and exported
  - ✅ Constructor accepts optional profile parameter
  - ✅ listInstances method working (single region)
  - ✅ listAllRegions method working (multiple regions in parallel)
  - ✅ AWS response transformation to EC2Instance[]
  - ✅ Uses Promise.all() for parallel region queries
- ✅ Output formatters (COMPLETE - 100%):
  - ✅ json-formatter.ts complete (with pretty printing)
  - ✅ csv-formatter.ts complete (bug fixed, header added)
  - ✅ table-formatter.ts complete (uses cli-table3 with spread operator)
  - ✅ index.ts complete (exports all formatters + factory function)
- ✅ CLI commands (COMPLETE - 100%):
  - ✅ ec2.ts refactored to export createEC2Command() factory function
  - ✅ Uses .action() callback pattern with Commander.js
  - ✅ Parses --region, --all-regions, --profile, --format options
  - ✅ Integrates EC2Service with profile support
  - ✅ Uses formatOutput() with user-specified format (defaults to 'table')
  - ✅ index.ts exports commands
- ✅ Main entry point (src/index.ts) - COMPLETE:
  - ✅ Shebang added: #!/usr/bin/env node
  - ✅ Commander program instance created
  - ✅ Program name, description, and version configured
  - ✅ EC2 subcommand registered via addCommand(createEC2Command())
  - ✅ .parse(process.argv) called to execute CLI
  - ✅ Successfully compiles and runs
- ✅ CLAUDE.md file created:
  - ✅ Development commands documented (build, run, CLI usage)
  - ✅ Architecture patterns explained (layered architecture, data flow)
  - ✅ Key design patterns documented (factory, service class, parallel execution, error transformation)
  - ✅ AWS integration details (credential handling, client initialization, response transformation)
  - ✅ TypeScript configuration explained
  - ✅ Error handling strategy documented
  - ✅ Code organization principles outlined
  - ✅ Current limitations noted
  - ✅ Important files listed with descriptions

**Next Steps:**
1. Add npm scripts for build, dev, and start
2. Test the CLI with AWS credentials
3. Update README with actual usage instructions

---

## Progress Tracker
- ✅ = Completed
- 🔄 = In Progress
- ❌ = Not Started

## Setup Phase

### 1. ✅ Initialize Node.js project with package.json
- ✅ package.json created
- ✅ Updated project name to "typescript-cloud-inventory"
- ✅ Set description and author (Kevin Breit)
- ✅ Set main entry point to `dist/index.js`

### 2. ✅ Install TypeScript and development dependencies
- ✅ TypeScript v5.9.3
- ✅ ts-node v10.9.2
- ✅ @types/node v25.0.9
- ✅ eslint v9.39.2
- ✅ @typescript-eslint/parser v8.53.1
- ✅ @typescript-eslint/eslint-plugin v8.53.1
- ✅ prettier v3.8.0

### 3. ✅ Create tsconfig.json with strict mode
- ✅ strict mode enabled for maximum type safety
- ✅ target set to ES2020
- ✅ module set to CommonJS
- ✅ outDir configured to `./dist` and rootDir to `./src`
- ✅ sourceMap enabled for debugging
- ✅ Additional strict options: noUncheckedIndexedAccess, exactOptionalPropertyTypes

### 4. ✅ Set up project directory structure
- ✅ Created src/ directory
- ✅ Created src/commands/ directory
- ✅ Created src/services/ directory
- ✅ Created src/formatters/ directory
- ✅ Created src/types/ directory
- ✅ Created src/utils/ directory
- ✅ Added .gitkeep files to track empty directories in git

## Core Implementation Phase

### 5. ✅ Install AWS SDK and CLI dependencies
- ✅ @aws-sdk/client-ec2 v3.972.0
- ✅ @aws-sdk/credential-providers v3.972.0
- ✅ commander v14.0.2
- ✅ cli-table3 v0.6.5 (includes built-in TypeScript types)

### 6. ✅ Create type definitions for EC2Instance and configuration
- ✅ `src/types/inventory.ts` - EC2Instance interface
- ✅ `src/types/config.ts` - OutputFormat type
- ✅ `src/types/index.ts` - Barrel exports for all types

### 7. ✅ Implement AWS client initialization service
- ✅ `src/services/aws-client.ts` - createEC2Client function
- ✅ Handle credential provider setup using fromIni()
- ✅ Support profile selection (optional profile parameter)
- ✅ Export client factory function (returns configured EC2Client)

### 8. ✅ Implement EC2 service for listing instances
- ✅ `src/services/ec2-service.ts` created
- ✅ Create EC2Service class (exported)
- ✅ Implement listInstances method for single region
  - Uses dynamic region parameter
  - Fetches instances via DescribeInstancesCommand
  - Transforms AWS response to EC2Instance[] format
  - Handles Tags to extract instance name
- ✅ Implement listAllRegions method for multiple regions
  - Takes array of region names
  - Uses Promise.all() to query regions in parallel
  - Uses .flat() to combine results into single array
  - Reuses listInstances method (no code duplication)
- ⚠️ Pagination not implemented (optional for MVP)
- ✅ Transform AWS responses to typed inventory items

### 9. ✅ Create output formatters (JSON, table, CSV) - COMPLETE
- ✅ `src/formatters/json-formatter.ts` - COMPLETE
  - ✅ Created formatJSON() function
  - ✅ Takes EC2Instance[] and returns JSON string
  - ✅ Implements pretty printing with 2-space indentation
  - ✅ Fully meets requirements
- ✅ `src/formatters/csv-formatter.ts` - COMPLETE
  - ✅ Created formatCSV() function
  - ✅ Fixed bug: Correctly converts object values to array before join()
  - ✅ Header row added: "ID,Name,Type,State"
  - ✅ Properly formats rows with comma separation
  - ✅ Fully meets requirements
- ✅ `src/formatters/table-formatter.ts` - COMPLETE
  - ✅ Created formatTable() function
  - ✅ Imports and uses cli-table3 library
  - ✅ Defines table headers: ['ID', 'Name', 'Type', 'State']
  - ✅ Maps EC2Instance data to table rows using spread operator
  - ✅ Returns formatted table string
  - ✅ Fully meets requirements
- ✅ `src/formatters/index.ts` - COMPLETE
  - ✅ Exports all three formatters (json, csv, table)
  - ✅ Imports EC2Instance and OutputFormat types
  - ✅ Implements factory function: formatOutput(instances, format)
  - ✅ Switch statement calls appropriate formatter based on format type
  - ✅ Fully meets requirements

### 10. ✅ Implement CLI command structure with Commander.js - COMPLETE
- ✅ `src/commands/ec2.ts` - EC2 command handler refactored to factory pattern
  - ✅ Exports createEC2Command() function that returns a Command object
  - ✅ Uses .action() callback to handle command execution
  - ✅ Parses all 4 required options: --region, --all-regions, --profile, --format
  - ✅ Passes profile to EC2Service constructor
  - ✅ Uses formatOutput() with user-specified format (defaults to 'table')
  - ✅ Handles both single region and all-regions modes
  - ✅ US regions list defined: us-east-1, us-east-2, us-west-1, us-west-2, us-gov-west-1, us-gov-east-1
  - ✅ Error handling with .catch() for both async branches
- ✅ `src/commands/index.ts` - Export commands
  - ✅ Exports createEC2Command function

### 11. ✅ Add error handling and validation - COMPLETE
- ✅ `src/utils/error-handler.ts` - Custom error types created
  - ✅ CredentialError class
  - ✅ AuthenticationError class
  - ✅ AccessDeniedError class
  - ✅ RateLimitError class
  - ✅ RegionError class
  - ✅ FormatError class
  - ✅ OptionError class
- ✅ Handle AWS SDK errors in service layer (src/services/ec2-service.ts)
  - ✅ Catches CredentialsProviderError → converts to CredentialError
  - ✅ Catches AuthFailure → converts to AuthenticationError
  - ✅ Catches UnauthorizedOperation → converts to AccessDeniedError
  - ✅ Catches ThrottlingException → converts to RateLimitError
  - ✅ Uses proper TypeScript type narrowing for unknown errors
  - ✅ Re-throws unknown errors appropriately
- ✅ Validate CLI inputs (src/commands/ec2.ts)
  - ✅ VALID_FORMATS constant created in src/types/config.ts
  - ✅ Format validation (in src/formatters/index.ts using VALID_FORMATS)
  - ✅ Region validation (checks against usRegions array)
  - ✅ Check for conflicting flags (line 28: both --region and --allRegions)
  - ✅ Check for missing flags (line 32: neither --region nor --allRegions)
- ✅ Provide helpful error messages in command layer (src/commands/ec2.ts)
  - ✅ All custom error types imported
  - ✅ Both catch blocks (lines 41-55 and 64-77) have instanceof checks
  - ✅ User-friendly error messages for: Credential, Authentication, AccessDenied, RateLimit
  - ✅ Generic error fallback for unknown errors
  - ✅ Exit code 1 on all errors

### 12. ✅ Create main entry point and wire everything together - COMPLETE
Created `src/index.ts` as the main CLI entry point:
- ✅ Add shebang at top of file: `#!/usr/bin/env node`
- ✅ Import Commander: `import { Command } from 'commander';`
- ✅ Import createEC2Command from './commands/ec2'
- ✅ Create main Commander program instance
- ✅ Set program name: 'cloud-inventory'
- ✅ Set program description: 'Application for querying cloud resources'
- ✅ Set version: '0.0.0' (hardcoded, not from package.json due to module complexity)
- ✅ Register the EC2 command as a subcommand using `program.addCommand(createEC2Command())`
- ✅ Call `.parse(process.argv)` to execute the CLI
- ✅ Successfully compiles with `tsc` and runs with `node dist/index.js`
- ✅ CLI displays help text correctly
- ✅ ec2 subcommand shows proper options with `--help`

**Implementation Notes:**
- Used CommonJS modules (`"module": "CommonJS"`) instead of ES modules to avoid module resolution complexity
- Refactored ec2.ts to use factory pattern (createEC2Command()) instead of executing on import
- Version hardcoded to avoid JSON import issues (can be updated later if needed)

### 13. ❌ Add npm scripts for build, dev, and start
Add to package.json:
```json
"scripts": {
  "build": "tsc",
  "dev": "ts-node src/index.ts",
  "start": "node dist/index.js",
  "lint": "eslint src/**/*.ts",
  "format": "prettier --write \"src/**/*.ts\""
}
```

## Testing & Documentation Phase

### 14. ❌ Test the CLI with AWS credentials
- Ensure AWS credentials are configured
- Test single region query
- Test all regions query
- Test different output formats
- Test error scenarios (invalid region, no credentials)

### 15. ❌ Update README with setup and usage instructions
- Add actual installation steps
- Add configuration examples
- Update usage examples with real command outputs
- Add troubleshooting section

## Stretch Goals (Optional)

- [ ] Add unit tests with Jest
- [ ] Add support for S3 buckets
- [ ] Add support for RDS instances
- [ ] Add filtering by tags
- [ ] Add cost estimation
- [ ] Package as standalone binary with pkg
- [ ] Add progress indicators for long operations
- [ ] Add caching for faster repeated queries

## Notes

- Start with the AWS SDK v3 documentation: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
- Use TypeScript's strict mode from the beginning - it will help you learn proper typing
- Test incrementally after each major step
- Commit to git after completing each phase
