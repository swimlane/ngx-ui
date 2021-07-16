export type DocExample = [
  codeText: string,
  codeLang?: 'typescript' | 'css' | 'markup' | 'bash' | 'scss'
];

export type DocExamples = Record<string, DocExample>;
