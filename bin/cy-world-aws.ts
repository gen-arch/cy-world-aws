#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CyWorldAwsStack } from '../lib/cy-world-aws-stack';

const app = new cdk.App();
new CyWorldAwsStack(app, 'CyWorldAwsStack');