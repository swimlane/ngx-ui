import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addCStylesToWorkspace, addNGXModules, addPackages, installDeps, printBanner } from './operations';

export function schematics(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      printBanner(),
      addPackages(),
      installDeps(),
      addNGXModules(_options),
      addCStylesToWorkspace(_options)
    ])(tree, _context);
  };
}
