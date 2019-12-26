import cdk      = require('@aws-cdk/core');
import ec2      = require('@aws-cdk/aws-ec2')
import r53      = require('@aws-cdk/aws-route53')
import elbv2    = require('@aws-cdk/aws-elasticloadbalancingv2')
import targets = require('@aws-cdk/aws-route53-targets')

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

    const www_sec = new ec2.SecurityGroup(this, 'www', {
      allowAllOutbound: true,
      description: 'www sec',
      vpc: vpc
    })

    www_sec.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80))
    www_sec.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.icmpPing())

    const image = new ec2.AmazonLinuxImage();
    const test_ins = new ec2.Instance(this, 'test-instance', {
      vpc: vpc,
      vpcSubnets: {
        subnetName: "cy-world-public"
      } ,
      instanceType: new ec2.InstanceType("t2.micro"),
      machineImage: image,
      securityGroup: www_sec
    })

    // const elb = new elbv2.ApplicationLoadBalancer(this, 'LoadBalancer', {
    //   vpc: vpc,
    //   loadBalancerName: 'cy-world-public-elb',
    //   vpcSubnets: {
    //     subnetName: "cy-world-public"
    //   } ,
    //   internetFacing: true
    // });

    // const tg = new elbv2.ApplicationTargetGroup(this, 'tg', {
    //   port: 80,
    //   protocol: elbv2.ApplicationProtocol.HTTP,
    // })

    // const lisner = elb.addListener('lisner', {
    //   open: true,
    //   port: 80,
    //   protocol: elbv2.ApplicationProtocol.HTTP,
    //   defaultTargetGroups: [tg]
    // })

    // tg.addTarget(new elbv2.InstanceTarget(test_ins.instanceId))

    // const zone = r53.HostedZone.fromLookup(this, 'cy-world', {
    //   domainName: "www.cy-world.com",
    //   privateZone: false,
    // })
    // new r53.ARecord(this, "www.cy-world.com", {
    //   zone: zone,
    //   target: r53.RecordTarget.fromIpAddresses("18.182.27.192")
    // })
  }
}
