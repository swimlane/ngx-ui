import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  logger,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';
import { tsquery } from '@phenomnomnominal/tsquery';
import { ClassDeclaration, NoSubstitutionTemplateLiteral } from 'typescript';

export interface NgxDocExampleSchema {
  name: string;
  path: string;
}

export default async function (host: Tree, schema: NgxDocExampleSchema) {
  const normalizedNames = names(schema.name);
  const docsRoot = readProjectConfiguration(host, 'docs').root;
  const pathToComponent = joinPathFragments(
    docsRoot,
    'src',
    'app',
    schema.path
  );

  const componentGenerator = wrapAngularDevkitSchematic(
    '@schematics/angular',
    'component'
  );
  await componentGenerator(host, {
    path: pathToComponent,
    project: 'docs',
    name: schema.name,
    inlineStyle: true,
    changeDetection: 'OnPush',
    prefix: 'docs',
    skipTests: true,
  });

  generateFiles(
    host,
    joinPathFragments(__dirname, './files'),
    pathToComponent,
    normalizedNames
  );
  const parentPathParts = pathToComponent.split('/');
  const parentComponentName = parentPathParts[parentPathParts.length - 2];

  const parentComponentPath = joinPathFragments(
    pathToComponent,
    '..',
    `${parentComponentName}.component.ts`
  );
  addExampleToParentComponent(host, normalizedNames, parentComponentPath);

  await formatFiles(host);
}

function addExampleToParentComponent(
  host: Tree,
  generatedComponentNames: ReturnType<typeof names>,
  pathToParentComponent: string
) {
  const componentEntry = host.read(pathToParentComponent);
  const componentContents = componentEntry.toString();

  const newClassContent = tsquery.replace(
    componentContents,
    'ClassDeclaration',
    (node: ClassDeclaration) => {
      // add the property declarations to the end of the class. NOTE: factory.createXXX doesn't work here
      const classStringWithNoEnding = node.getText().trim().slice(0, -1);
      return `${classStringWithNoEnding} readonly ${generatedComponentNames.propertyName}ExampleContent = ${generatedComponentNames.className}Content;
    }`;
    }
  );

  const heading = generatedComponentNames.fileName
    .split('-')
    .map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      return `${firstLetter}${word.slice(1)}`;
    })
    .join(' ');

  const newComponentTemplate = tsquery.replace(
    newClassContent,
    'NoSubstitutionTemplateLiteral',
    (node) => {
      return `
      ${node.getText().slice(0, -1)}
      ${generateNewTemplate({ ...generatedComponentNames, heading })}
      `;
    }
  );

  if (newComponentTemplate !== componentContents) {
    host.write(
      pathToParentComponent,
      `${generateNewImports(generatedComponentNames)}${newComponentTemplate}`
    );
    logger.info(`UPDATE ${pathToParentComponent}`);
  }
}

const generateNewImports = (generatedNames) => `
import { ${generatedNames.className}Content } from './examples/${generatedNames.fileName}';
`;

const generateNewTemplate = (generatedNames) => `
      <ngx-doc-example heading='${generatedNames.heading}'
                       id='${generatedNames.fileName}'
                       [content]='${generatedNames.propertyName}ExampleContent'>
        <docs-${generatedNames.fileName}></docs-${generatedNames.fileName}>
      </ngx-doc-example>
    \`
  `;
