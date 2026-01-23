import { EC2Service } from './services/ec2-service';
import { formatOutput } from './formatters/index';

const service = new EC2Service();
service.listAllRegions(['us-east-1', 'us-east-2'])
  .then(instances => {
    // console.log('EC2 instances: ', instances);
    // console.log(formatCSV(instances));
    // console.log(formatJSON(instances));
    console.log(formatOutput(instances, 'json'));
  })
  .catch(err => {
    console.error('Error: ', err);
  });

