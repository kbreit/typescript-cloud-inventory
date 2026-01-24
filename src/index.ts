#!/usr/bin/env node

import { Command } from 'commander';
import { createEC2Command } from './commands/ec2';

const program = new Command();

program
  .name('cloud-inventory')
  .description('Application for querying cloud resources')
  .version('0.0.0');

program.addCommand(createEC2Command());
program.parse(process.argv);
