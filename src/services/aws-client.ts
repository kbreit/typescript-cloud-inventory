import { EC2Client } from "@aws-sdk/client-ec2";
import { fromIni } from "@aws-sdk/credential-providers";


export const createEC2Client = async(region: string, profile?: string) => {

  let providerConfig;
  if (profile !== undefined) {
    providerConfig = {profile: profile};
  } else {
    providerConfig = {};
  }

  const provider = fromIni(providerConfig);

  const client = new EC2Client({
    region: region,
    credentials: provider,
  });

  return client;
}
