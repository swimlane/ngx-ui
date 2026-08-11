import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import {
  getPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
  addPackageJsonDependency
} from '@schematics/angular/utility/dependencies';
import { addModuleImportToRootModule, getProjectFromWorkspace, getProjectTargetOptions } from '@angular/cdk/schematics';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';

export const addPackages = (options: Schema) => {
  return (tree: Tree, _context: SchematicContext) => {
    const ngCoreVersionTag = getPackageJsonDependency(tree, '@angular/core');
    // TODO: find appropriate angular version and then get the matching ngxUI
    const ngxUIVersion = getNgxUIVersion();

    const dependencies: Partial<NodeDependency>[] = [
      {
        name: '@swimlane/ngx-ui',
        version: ngxUIVersion,
        overwrite: true
      },
      {
        name: '@angular/cdk',
        version: String(ngCoreVersionTag?.version)
      },
      {
        name: 'moment',
        version: `2.29.1`
      },
      {
        name: 'moment-timezone',
        version: `0.5.34`
      },
      {
        name: '@codemirror/state',
        version: '^6.5.2'
      },
      {
        name: '@codemirror/view',
        version: '^6.36.0'
      },
      {
        name: '@codemirror/commands',
        version: '^6.8.0'
      },
      {
        name: '@codemirror/language',
        version: '^6.11.0'
      },
      {
        name: '@codemirror/autocomplete',
        version: '^6.18.0'
      },
      {
        name: '@codemirror/lint',
        version: '^6.8.0'
      },
      {
        name: '@codemirror/search',
        version: '^6.5.0'
      },
      {
        name: '@codemirror/lang-javascript',
        version: '^6.2.0'
      },
      {
        name: '@codemirror/lang-json',
        version: '^6.0.0'
      },
      {
        name: '@codemirror/lang-yaml',
        version: '^6.1.0'
      },
      {
        name: '@codemirror/lang-python',
        version: '^6.1.0'
      },
      {
        name: '@codemirror/lang-html',
        version: '^6.4.0'
      },
      {
        name: '@uiw/codemirror-theme-dracula',
        version: '^4.23.0'
      },
      {
        name: '@uiw/codemirror-theme-monokai',
        version: '^4.23.0'
      },
      {
        name: '@uiw/codemirror-theme-eclipse',
        version: '^4.23.0'
      },
      {
        name: 'json-schema',
        version: '*.4.0'
      },
      {
        name: '@types/json-schema',
        version: '^7.0.9',
        type: NodeDependencyType.Dev
      },
      {
        name: 'ngx-autosize-input',
        version: '^2.3.7'
      },
      {
        name: 'resize-observer-polyfill',
        version: '^1.5.1',
        type: NodeDependencyType.Dev
      },
      {
        name: 'ngx-moment',
        version: '^5.0.0',
        type: NodeDependencyType.Dev
      }
    ];

    if (options?.addNgxUITesting) {
      dependencies.push({
        name: '@swimlane/ngx-ui-testing',
        version: '1.1.2',
        type: NodeDependencyType.Dev
      });
    }

    const nodeDependencies: NodeDependency[] = dependencies.map(item => ({
      ...item,
      type: item.type || NodeDependencyType.Default,
      overwrite: item.overwrite || false
    })) as NodeDependency[];

    nodeDependencies.forEach(async dependency => {
      addPackageJsonDependency(tree, dependency);
      _context.logger.log('info', `✅️ added "${dependency.name}" into ${dependency.type}`);
    });

    return tree;
  };
};

const getNgxUIVersion = () => `42.1.1`;

export const installDeps = () => (tree: Tree, _context: SchematicContext) => {
  _context.logger.info('installing dependencies...');

  _context.addTask(new NodePackageInstallTask());
  return tree;
};

export const addNGXModules = (_: Schema) => async (tree: Tree, _context: SchematicContext) => {
  const ngxUINamespace = '@swimlane/ngx-ui';
  const ngxUIModuleName = 'NgxUIModule';
  const ngxIconModuleName = 'IconModule';

  const workspace: any = await getWorkspace(tree);
  const project = getProjectFromWorkspace(workspace);

  addModuleImportToRootModule(tree, ngxUIModuleName, ngxUINamespace, project);
  addModuleImportToRootModule(tree, ngxIconModuleName, ngxUINamespace, project);
};

export const addStylesToWorkspace = (options: Schema) => async (_: Tree, _context: SchematicContext) => {
  _context.logger.info('adding styles...');
  let projectName = options.project;

  const assetPath = 'node_modules/@swimlane/ngx-ui/index.css';
  return updateWorkspace((workspace: any) => {
    if (!projectName) {
      projectName = workspace.extensions['defaultProject'];
    }

    const project = getProjectFromWorkspace(workspace, projectName);
    const targetOptionsList = [getProjectTargetOptions(project, 'build'), getProjectTargetOptions(project, 'test')];
    targetOptionsList.forEach(targetOptions => {
      const styles = targetOptions['styles'] as (string | { input: string })[];
      const existingStyles = styles.map(s => (typeof s === 'string' ? s : s.input));

      if (!targetOptions.styles) {
        targetOptions.styles = [assetPath];
      } else if (!existingStyles.find((s: any) => s.includes(assetPath))) {
        styles.unshift(assetPath);
      }
    });

    return workspace;
  });
};

export const createNPMRC = () => (tree: Tree, _context: SchematicContext) => {
  if (!tree.exists('.npmrc')) {
    tree.create('.npmrc', 'legacy-peer-deps = true');
  } else {
    _context.logger.info(`Please run 'npm install --legacy-peer-deps' to use @swimlane/ng-ui in your app.`);
  }

  return tree;
};

export const logBanner = () => (_: Tree, _context: SchematicContext) => {
  _context.logger.warn(`@swimlane/ngx-ui - Component & Style Library for Angular by Swimlane`);
};

export const logAboutSyntheticImports = () => (_: Tree, _context: SchematicContext) => {
  _context.logger.info(`Please configure 'allowSyntheticDefaultImports' setting in tsconfig to avoid errors`);
};
