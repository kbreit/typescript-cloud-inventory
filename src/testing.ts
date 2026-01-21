import { EC2Service } from './services/ec2-service';

const service = new EC2Service();
service.listInstances('us-east-1')
  .then(instances => {
    console.log('EC2 instances: ', instances);
  })
  .catch(err => {
    console.error('Error: ', err);
  });
