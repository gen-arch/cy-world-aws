import cdk      = require('@aws-cdk/core');
import ec2      = require('@aws-cdk/aws-ec2')

export class ComputeStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}