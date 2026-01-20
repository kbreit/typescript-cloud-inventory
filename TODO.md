# Cloud Resource Inventory CLI - Implementation Todo List

## Current Status
**Last Updated:** Project rescanned on 2026-01-20 at 15:35

**Completed:**
- ✅ package.json fully configured (name: typescript-cloud-inventory, author: Kevin Breit, main: dist/index.js)
- ✅ TypeScript v5.9.3 installed

**Next Steps:**
1. Install remaining dev dependencies (ts-node, @types/node, eslint, prettier)
2. Create tsconfig.json with strict mode configuration
3. Set up src/ directory structure

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

### 2. 🔄 Install TypeScript and development dependencies
- ✅ TypeScript installed
- ❌ Still needed:
```bash
npm install --save-dev ts-node @types/node
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier
```

### 3. ❌ Create tsconfig.json with strict mode
- Enable strict mode for maximum type safety
- Set target to ES2020
- Set module to CommonJS
- Configure outDir to `./dist` and rootDir to `./src`
- Enable sourceMap for debugging

### 4. ❌ Set up project directory structure
Create the following directories:
```
src/
  commands/
  services/
  formatters/
  types/
  utils/
```

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
