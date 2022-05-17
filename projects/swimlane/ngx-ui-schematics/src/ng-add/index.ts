import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { addStylesToWorkspace, addNGXModules, addPackages, logBanner, logInstallDependencies } from './operations';
import { Schema } from './schema';

//#region json imports
// the below json imports are required as these are required on dist folder
// if removed schematics will break as tsc will publish the json files if not referenced
//@ts-ignore
import * as schema from './schema.json';
//@ts-ignore
import * as collection from '../collection.json';
//#endregion

export function schematics(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      logBanner(),
      addPackages(_options),
      addNGXModules(_options),
      addStylesToWorkspace(_options),
      logInstallDependencies()
    ])(tree, _context);
  };
}
