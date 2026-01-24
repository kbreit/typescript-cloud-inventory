export const VALID_FORMATS = ['json', 'table', 'csv'] as const;
export type OutputFormat = typeof VALID_FORMATS[number];

