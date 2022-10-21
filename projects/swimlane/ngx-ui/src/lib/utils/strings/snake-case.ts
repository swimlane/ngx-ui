//snakeCase("test string");
//=> "test_string"

export function snakeCase(source: string): string {
  return source
    .replace(/[.\s]+/g, '_') // replace ws and . with _
    .replace(/\W/g, '') // remove every non [A-Za-z0-9_] char
    .replace(/_+/g, '_'); // combine multiple _'s into a single one
}
