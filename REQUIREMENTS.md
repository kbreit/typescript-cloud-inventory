# Cloud Resource Inventory CLI - Requirements Document

## Project Overview
A command-line tool that queries cloud providers (starting with AWS) and outputs an inventory of resources in various formats. Built with TypeScript to demonstrate type safety, async patterns, and CLI development.

## Learning Objectives
- TypeScript fundamentals (types, interfaces, generics)
- Async/await and Promise handling
- Working with AWS SDK v3 for JavaScript/TypeScript
- Building CLI applications with argument parsing
- Error handling with custom types
- Output formatting (JSON, CSV, table)

## Functional Requirements

### MVP (Minimum Viable Product)
1. **AWS EC2 Instance Inventory**
   - List all EC2 instances across specified regions
   - Display: Instance ID, Type, State, Name tag, Launch time
   - Support single region or all regions

2. **CLI Interface**
   - `cloud-inventory ec2 --region us-east-1` - List EC2 in one region
   - `cloud-inventory ec2 --all-regions` - List EC2 in all regions
   - `cloud-inventory ec2 --profile <profile>` - Use specific AWS profile
   - `--format json|table|csv` - Output format

3. **Output Formats**
   - JSON: Structured data suitable for piping to other tools
   - Table: Human-readable console table
   - CSV: For spreadsheet import

4. **Error Handling**
   - Handle missing AWS credentials gracefully
   - Handle API errors (rate limiting, permission denied)
   - Validate user inputs

### Future Enhancements (Post-MVP)
- Support for S3 buckets, RDS instances, Lambda functions
- Multi-cloud support (Azure, GCP)
- Filter by tags
- Export to file
- Cost estimation per resource
- Resource age/compliance checks

## Technical Requirements

### Dependencies
- **Runtime**: Node.js 18+
- **AWS SDK**: `@aws-sdk/client-ec2`, `@aws-sdk/credential-providers`
- **CLI Framework**: `commander` for argument parsing
- **Output**: `cli-table3` for table formatting
- **Dev Tools**: TypeScript, ts-node, eslint, prettier

### Type Safety
- Strong typing for all AWS API responses
- Custom interfaces for inventory items
- Type guards for runtime validation
- No use of `any` type (except for truly dynamic cases)

### Project Structure
- Separate concerns: CLI parsing, AWS clients, formatters, types
- Testable architecture
- Configuration management

### Authentication
- Use AWS credential chain (environment variables, ~/.aws/credentials, IAM roles)
- Support AWS profile selection via --profile flag
- Never hardcode credentials

## Non-Functional Requirements

### Performance
- Parallel region queries when using --all-regions
- Stream large result sets
- Timeout handling (30s default)

### Usability
- Clear error messages
- Help text and examples
- Progress indicators for long operations

### Code Quality
- TypeScript strict mode enabled
- Linting with ESLint
- Consistent code formatting with Prettier
- Comments for complex logic

## Success Criteria
- Can query EC2 instances in one or all AWS regions
- Outputs data in 3 formats (JSON, table, CSV)
- Handles errors gracefully with helpful messages
- Code demonstrates TypeScript best practices
- README includes setup and usage instructions
- Can be run with `npm start` or as installed CLI tool

## Out of Scope (For Initial Version)
- Web UI/dashboard
- Database storage
- Real-time monitoring
- Authentication beyond AWS credentials
- Caching mechanisms
