import { EC2Instance } from '../types/index';

export function formatJSON(ec2Instances: EC2Instance[]) {
  return JSON.stringify(ec2Instances, null, 2);
}
