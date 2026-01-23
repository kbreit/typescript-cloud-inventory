import { EC2Instance } from '../types/index';

export function formatCSV(ec2Instances: EC2Instance[]) {
  const header: string = "ID,Name,Type,State";
  const csvRows: string = ec2Instances.map(row => [row.id, row.name, row.type, row.state].join(',')).join('\n');

  return header + '\n' + csvRows;
}
