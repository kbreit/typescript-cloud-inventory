# Cloud Resource Inventory CLI - Implementation Todo List

## Current Status
**Last Updated:** Project rescanned on 2026-01-20 at 16:30

**Completed:**
- ✅ package.json fully configured (name: typescript-cloud-inventory, author: Kevin Breit, main: dist/index.js)
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
  - rootDir: ./src, outDir: ./dist
  - sourceMap enabled
- ✅ Project directory structure created:
  - src/commands/, src/services/, src/formatters/, src/types/, src/utils/

**Next Steps:**
1. Install AWS SDK and CLI dependencies (commander, cli-table3, @aws-sdk/client-ec2)
2. Create type definitions for EC2Instance and configuration
3. Implement AWS client service

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

### 5. ❌ Install AWS SDK and CLI dependencies
```bash
npm install @aws-sdk/client-ec2 @aws-sdk/credential-providers
npm install commander cli-table3
npm install --save-dev @types/cli-table3
```

### 6. ❌ Create type definitions for EC2Instance and configuration
- `src/types/inventory.ts` - EC2Instance interface
- `src/types/config.ts` - CLI configuration types
- `src/types/index.ts` - Export all types

### 7. ❌ Implement AWS client initialization service
- `src/services/aws-client.ts`
- Handle credential provider setup
- Support profile selection
- Export client factory functions

### 8. ❌ Implement EC2 service for listing instances
- `src/services/ec2-service.ts`
- Create EC2Service class
- Implement listInstances method for single region
- Implement listAllRegions method for multiple regions
- Handle pagination if needed
- Transform AWS responses to typed inventory items

### 9. ❌ Create output formatters (JSON, table, CSV)
- `src/formatters/json-formatter.ts` - JSON.stringify with formatting
- `src/formatters/table-formatter.ts` - Use cli-table3 library
- `src/formatters/csv-formatter.ts` - Generate CSV string
- `src/formatters/index.ts` - Export formatter factory function

### 10. ❌ Implement CLI command structure with Commander.js
- `src/commands/ec2.ts` - EC2 command handler
- Parse options: --region, --all-regions, --profile, --format
- Call EC2Service and formatters
- `src/commands/index.ts` - Export commands

### 11. ❌ Add error handling and validation
- `src/utils/error-handler.ts` - Custom error types
- Handle AWS SDK errors (credentials, permissions, rate limiting)
- Validate CLI inputs
- Provide helpful error messages

### 12. ❌ Create main entry point and wire everything together
- `src/index.ts` - Set up Commander program
- Register commands
- Add help text and examples
- Add shebang for CLI execution: `#!/usr/bin/env node`

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
