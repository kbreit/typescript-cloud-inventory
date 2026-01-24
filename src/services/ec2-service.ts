import { createEC2Client } from "./aws-client";
import { EC2Instance } from "../types/index";
import {
  CredentialError,
  AuthenticationError,
  AccessDeniedError,
  RateLimitError
} from '../utils/error-handler';
import {
  DescribeInstancesCommand,
  Reservation,
  Instance,
  Tag,
} from "@aws-sdk/client-ec2";

export class EC2Service {
  private profile: string | undefined;

  constructor(profile?: string) {
    this.profile = profile;
  }

  listInstances = async(region: string): Promise<EC2Instance[]> => {
    const client = await createEC2Client(region, this.profile);

    const input = {
      DryRun: false,
    }

    const command = new DescribeInstancesCommand(input);
    let response;
    try {
      response = await client.send(command);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'name' in error) {
          if (error.name === 'CredentialsProviderError') {
            throw new CredentialError('Invalid credentials!');
            process.exit(1)
          }
          else if (error.name === 'AuthFailure') {
            throw new AuthenticationError('Authentication failure');
            process.exit(1)
          }
          else if (error.name === 'UnauthorizedOperation') {
            throw new AccessDeniedError('Access denied');
            process.exit(1)
          }
          else if (error.name === 'ThrottlingException') {
            throw new RateLimitError('Rate limit exceeded. Try again soon.');
            process.exit(1)
          }
      }
      throw error;
    }

    const reservations: Reservation[] = response.Reservations || [];
    const allInstances: Instance[] = reservations.flatMap((reservation: Reservation) => reservation.Instances || []);

    const ec2Instances: EC2Instance[] = allInstances.map((instance: Instance) => ({
        id: instance.InstanceId || '',
        type: instance.InstanceType || '',
        state: instance.State?.Name || '',
        name: instance.Tags?.find((tag: Tag) => tag.Key === 'Name')?.Value || '', 
      }));

    return ec2Instances;
  }

  listAllRegions = async(regions: string[]): Promise<EC2Instance[]> => {
    const allResults = await Promise.all(
      regions.map(region => this.listInstances(region))
    );

    return allResults.flat();
  }

}
