import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  getPackageJsonDependency,
  NodeDependencyType
} from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

export function schematics(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const ngCoreVersionTag = getPackageJsonDependency(tree, '@angular/core');
    addPackageJsonDependency(tree, {
      name: '@angular/cdk',
      version: String(ngCoreVersionTag?.version),
      type: NodeDependencyType.Default
    });

    let installTaskId = _context.addTask(new NodePackageInstallTask());
    installTaskId = _context.addTask(new RunSchematicTask('setup-ngx-ui', _options), [installTaskId]);
    _context.addTask(new NodePackageInstallTask(), [installTaskId]);
  };
}
