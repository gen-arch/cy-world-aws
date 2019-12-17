import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2')

export class CyWorldAwsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'cy-world-vpc', {
      cidr: '10.0.0.0/21',
      subnetConfiguration: [
        {
          cidrMask: 24,
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'cy-world-public'
        },
        {
          cidrMask: 24,
          subnetType: ec2.SubnetType.PRIVATE,
          name: 'cy-world-private'
        }
      ]
    });

    const image = new ec2.AmazonLinuxImage();
    new ec2.Instance(this, 'test-instance', {
      vpc: vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: image
    })
  }
}
