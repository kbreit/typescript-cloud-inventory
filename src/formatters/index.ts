export * from './json-formatter';
export * from './csv-formatter';
export * from './table-formatter';

import { EC2Instance, OutputFormat } from '../types/index';
import { formatJSON } from './json-formatter';
import { formatCSV } from './csv-formatter';
import { formatTable } from './table-formatter';

export function formatOutput(instances: EC2Instance[], format: OutputFormat): string {
  switch(format) {
    case 'json':
      return formatJSON(instances);
    case 'csv':
      return formatCSV(instances);
    case 'table':
      return formatTable(instances);
}
}
