export interface JsonSchemaDataType {
  name: string;
  defaultValue: () => unknown;
  schema: {
    type: string;
    format?: string;
  };
  icon: string;
  matchType: (value: unknown) => boolean;
}
