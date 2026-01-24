export * from './json-formatter';
export * from './csv-formatter';
export * from './table-formatter';

import { EC2Instance, OutputFormat, VALID_FORMATS } from '../types/index';
import { formatJSON } from './json-formatter';
import { formatCSV } from './csv-formatter';
import { formatTable } from './table-formatter';
import { FormatError } from '../utils/error-handler';

export function formatOutput(instances: EC2Instance[], format: OutputFormat): string {
  if (!VALID_FORMATS.includes(format)) {
    throw new FormatError('Incorrect format');
  }
  switch(format) {
    case 'json':
      return formatJSON(instances);
    case 'csv':
      return formatCSV(instances);
    case 'table':
      return formatTable(instances);
}
}
