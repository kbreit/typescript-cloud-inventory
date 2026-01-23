import { EC2Instance } from '../types/index';
import Table from 'cli-table3';

export function formatTable(ec2Instances: EC2Instance[]) {
  var table = new Table({
    head: ['ID', 'Name', 'Type', 'State'],
  });

  table.push(...ec2Instances.map(instance => [instance.id, instance.name, instance.type, instance.state]));

  return table.toString();
}
