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

export const addPackages = () => {
  return (tree: Tree, _context: SchematicContext) => {
    // TODO: find appropriate angular version and then get the matching ngxUI
    const ngCoreVersionTag = getPackageJsonDependency(tree, '@angular/core');
    const ngxUIVersion = getNgxUIVersion();

    const dependencies: NodeDependency[] = [
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
        version: `2.29.3`
      },
      {
        name: 'moment-timezone',
        version: `0.5.34`
      },
      {
        name: 'ngx-moment',
        version: `6.0.2`
      },
      {
        name: 'resize-observer-polyfill',
        version: `1.5.1`
      }
    ].map(item => ({
      ...item,
      type: NodeDependencyType.Default,
      overwrite: item.overwrite || false
    }));

    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);
      _context.logger.log('info', `✅️ added "${dependency.name}" into ${dependency.type}`);
    });

    return tree;
  };
};

export const installDeps = () => (tree: Tree, _context: SchematicContext) => {
  _context.logger.info('installing dependencies...');

  _context.addTask(new NodePackageInstallTask());
  return tree;
};

export const addNGXModules = (_: Schema) => async (tree: Tree, _context: SchematicContext) => {
  const ngxUINamespace = '@swimlane/ngx-ui';
  const ngxUIModuleName = 'NgxUIModule';
  const ngxIconModuleName = 'IconModule';

  const workspace = await getWorkspace(tree);
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
    const targetOptions = getProjectTargetOptions(project, 'build');
    const styles = targetOptions['styles'] as (string | { input: string })[];
    const existingStyles = styles.map(s => (typeof s === 'string' ? s : s.input));

    if (!targetOptions.styles) {
      targetOptions.styles = [assetPath];
    } else if (!existingStyles.find((s: any) => s.includes(assetPath))) {
      styles.unshift(assetPath);
    }

    return workspace;
  });
};

export const printBanner = () => (_: Tree, _context: SchematicContext) => {
  _context.logger.warn(`@swimlane/ngx-ui - Component & Style Library for Angular by Swimlane`);
};

const getNgxUIVersion = () => `^40.4.0`;
