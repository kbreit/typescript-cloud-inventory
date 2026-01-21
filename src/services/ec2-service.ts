import { createEC2Client } from "./aws-client";
import { EC2Instance } from "../types/index";
import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";

export class EC2Service {

  listInstances = async(region: string): Promise<EC2Instance[]> => {
    const client = await createEC2Client(region);

    const input = {
      DryRun: false,
    }

    const command = new DescribeInstancesCommand(input);
    const response = await client.send(command);

    const reservations = response.Reservations || [];
    const allInstances = reservations.flatMap(reservation => reservation.Instances || []);

    const ec2Instances: EC2Instance[] = allInstances.map(instance => ({
        id: instance.InstanceId || '',
        type: instance.InstanceType || '',
        state: instance.State?.Name || '',
        name: instance.Tags?.find(tag => tag.Key === 'Name')?.Value || '', 
      }));

    return ec2Instances;
  }

  listAllRegions = async(regions: string[]): Promise<EC2Instance[]> => {
    let allEC2Instances: EC2Instance[] = [];
    for (const region of regions) {
      const instances = await this.listInstances(region);
      allEC2Instances = allEC2Instances.concat(instances);
    }

    return allEC2Instances;
  }

}
