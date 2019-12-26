#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CyWorldAwsStack } from '../lib/cy-world-aws-stack';

const app = new cdk.App();
new CyWorldAwsStack(app, 'CyWorldAwsStack', {
    env: {
        region: "ap-northeast-1",
        account: "681514512350"
    }
});