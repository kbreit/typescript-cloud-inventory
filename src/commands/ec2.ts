import { EC2Service } from '../services/ec2-service';
import { formatOutput } from '../formatters/index';
import { Command } from 'commander';
import { 
  RegionError,
  OptionError,
  CredentialError,
  AuthenticationError,
  AccessDeniedError,
  RateLimitError
} from '../utils/error-handler';

export function createEC2Command(): Command {
  const program = new Command('ec2')
    .description("A CLI tool for showing EC2 instance information")
    .option("--region [value]", "Region where the EC2 instances reside")
    .option("--all-regions", "Search all regions for instances")
    .option("--profile [value]", "AWS CLI profile name")
    .option("--format [value]", "Output format of data")
    .action (async (options) => {
      const service = new EC2Service(options.profile);
      const usRegions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2', 'us-gov-west-1', 'us-gov-east-1'];

      if (options.allRegions && options.region) {
        throw new OptionError('--all-regions and --region are mutually exclusive');
      }

      if (!options.allRegions && !options.region) {
        throw new OptionError('Either --all-regions or --region must be specified');
      }

      if (options.allRegions === true) {
        service.listAllRegions(usRegions)
          .then(instances => {
            console.log(formatOutput(instances, options.format || 'table'));
          })
          .catch(err => {
            if(err instanceof CredentialError) {
              console.error('Credential error: ', err.message);
            } else if(err instanceof AuthenticationError) {
              console.error('Authentication error: ', err.message);
            } else if(err instanceof AccessDeniedError ) {
              console.error('Access denied error: ', err.message);
            } else if(err instanceof RateLimitError) {
              console.error('Rate limit error: ', err.message);
            } else {
              console.error('Error: ', err.message);
            }
          
            process.exit(1)
          });
      } else {
        if (!usRegions.includes(options.region)) {
          throw new RegionError("Invalid region");
        }
        service.listInstances(options.region)
          .then(instances => {
            console.log(formatOutput(instances, options.format || 'table'));
          })
          .catch(err => {
            if(err instanceof CredentialError) {
              console.error('Credential error: ', err.message);
            } else if(err instanceof AuthenticationError) {
              console.error('Authentication error: ', err.message);
            } else if(err instanceof AccessDeniedError ) {
              console.error('Access denied error: ', err.message);
            } else if(err instanceof RateLimitError) {
              console.error('Rate limit error: ', err.message);
            } else {
              console.error('Error: ', err.message);
            }
            process.exit(1);
          });
      }
    });
  return program;
}


