import { EC2Service } from '../services/ec2-service';
import { formatOutput } from '../formatters/index';
import { Command } from 'commander';

const program = new Command();

program
  .description("A CLI tool for showing EC2 instance information")
  .option("--region [value]", "Region where the EC2 instances reside")
  .option("--all-regions", "Search all regions for instances")
  .option("--profile [value]", "AWS CLI profile name")
  .option("--format [value]", "Output format of data")
  .parse(process.argv);


const options = program.opts();
const service = new EC2Service(options.profile);

if (options['all-regions'] === true) {
  const usRegions = ['us-east-1', 'us-east-2', 'us-west-1', 'us-west-2', 'us-gov-west-1', 'us-gov-east-1'];
  service.listAllRegions(usRegions)
    .then(instances => {
      console.log(formatOutput(instances, options.format || 'table'));
    })
    .catch(err => {
      console.error('Error: ', err);
    });
} else {
  service.listInstances(options.region)
    .then(instances => {
      console.log(formatOutput(instances, options.format || 'table'));
    })
    .catch(err => {
      console.error('Error: ', err);
    });
}
