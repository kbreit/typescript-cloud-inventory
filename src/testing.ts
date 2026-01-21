import { EC2Service } from './services/ec2-service';

const service = new EC2Service();
service.listAllRegions(['us-east-1', 'us-east-2'])
  .then(instances => {
    console.log('EC2 instances: ', instances);
  })
  .catch(err => {
    console.error('Error: ', err);
  });
