import {
  formatFiles,
  generateFiles,
  joinPathFragments,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';

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

  await formatFiles(host);
}
