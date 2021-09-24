import { formatFiles, joinPathFragments, logger, names, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { wrapAngularDevkitSchematic } from '@nrwl/devkit/ngcli-adapter';
import { tsquery } from '@phenomnomnominal/tsquery';
import { NoSubstitutionTemplateLiteral } from 'typescript';

interface NgxDocPageSchema {
  name: string;
  path: string;
}

export default async function(host: Tree, schema: NgxDocPageSchema) {
  const normalizedNames = names(schema.name);
  const withPageNames = names(normalizedNames.fileName.endsWith('page') ? normalizedNames.fileName : `${normalizedNames.fileName}-page`);
  const docsRoot = readProjectConfiguration(host, 'docs').root;
  const pathToPage = joinPathFragments(docsRoot, 'src', 'app', schema.path, normalizedNames.fileName);
  const moduleGenerator = wrapAngularDevkitSchematic('@schematics/angular', 'module');
  const componentGenerator = wrapAngularDevkitSchematic(
    '@schematics/angular',
    'component'
  );

  await moduleGenerator(host, {
    name: withPageNames.fileName,
    path: pathToPage,
    flat: true,
    commonModule: true,
    project: 'docs'
  });

  await componentGenerator(host, {
    name: withPageNames.fileName,
    path: pathToPage,
    project: 'docs',
    inlineStyle: true,
    inlineTemplate: true,
    changeDetection: 'OnPush',
    prefix: 'docs',
    skipTests: true,
    viewEncapsulation: 'None',
    flat: true
  });

  const componentPath = joinPathFragments(pathToPage, `${withPageNames.fileName}.component.ts`);
  updateComponentTemplate(host, componentPath, normalizedNames.className);

  const modulePath = joinPathFragments(pathToPage, `${withPageNames.fileName}.module.ts`);
  updateModuleImports(host, modulePath, `${withPageNames.className}Component`);

  const pathToRouteFile = joinPathFragments(docsRoot, 'src', 'app', 'app.routes.ts');
  const params: AppRouteUpdaterParams = {
    host,
    pathToRouteFile,
    pathToModuleFromRouteFile: joinPathFragments(schema.path, normalizedNames.fileName,`${withPageNames.fileName}.module`),
    urlPath: `${normalizedNames.className}`,
    moduleName: `${withPageNames.className}Module`
  };
  updateAppRoutes(params);

  await formatFiles(host);
}


function updateModuleImports(host: Tree, modulePath: string, componentClassName: string) {

  const fileEntry = host.read(modulePath);
  const contents = fileEntry.toString();

  const newContents = tsquery.replace(contents, 'ArrayLiteralExpression Identifier[name=CommonModule]', () => {
    return `CommonModule, RouterModule.forChild(generateRoutes(${componentClassName})), DocPageModule, DocExampleModule, DocMarkdownModule`;
  });

  if (newContents !== contents) {
    host.write(modulePath, `${Module_Imports}${newContents}`);
    logger.info(`UPDATE ${modulePath}`);
  }
}

function updateComponentTemplate(host: Tree, componentPath: string, headerName: string) {
  const fileEntry = host.read(componentPath);
  const contents = fileEntry.toString();

  // there's only 1 of these nodes which is the inline template. no need to check node
  const newContents = tsquery.replace(contents, 'NoSubstitutionTemplateLiteral', () => {
    return `\`
        <ngx-doc-page header='${headerName}'>
          <ng-template ngxDocPageTab='TODO Name Tab'>
            <pre>TODO example goes here</pre>
          </ng-template>
        </ngx-doc-page>
    \``;
  });

  if (newContents !== contents) {
    host.write(componentPath, newContents);
    logger.info(`UPDATE ${componentPath}`);
  }
}


interface AppRouteUpdaterParams {
  host: Tree,
  pathToRouteFile: string,
  urlPath: string,
  pathToModuleFromRouteFile: string,
  moduleName: string
}

function updateAppRoutes({
                           host,
                           pathToRouteFile,
                           urlPath,
                           pathToModuleFromRouteFile,
                           moduleName
                         }: AppRouteUpdaterParams) {
  const fileEntry = host.read(pathToRouteFile);
  const contents = fileEntry.toString();

  const newContents = tsquery.replace(contents, 'ArrayLiteralExpression > ObjectLiteralExpression:last-child', (node) => {
    return `${node.getText()}, {path: '${urlPath.toLowerCase()}', loadChildren: () => import('./${pathToModuleFromRouteFile}').then((m) => m.${moduleName}), data: {title: '${names(urlPath).className}'}}`;

  });

  if (newContents !== contents) {
    host.write(pathToRouteFile, newContents);
    logger.info(`UPDATE ${pathToRouteFile}`);
  }

}

const Module_Imports = `
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
`;
