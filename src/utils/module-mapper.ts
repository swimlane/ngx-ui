export function mapModule(imports) {
  let obj = {
    providers: [],
    modules: [],
    declarations: []
  };

  for(let objs of imports) {
    for(let [k,v] of Object.entries(objs)) {
      if((k.indexOf('Component') + k.indexOf('Directive')) > -1) {
        obj.declarations.push(v);
      } else if(k.indexOf('Module') > -1) {
        obj.modules.push(v);
      } else if(k.indexOf('Service') > -1) {
        obj.providers.push(v);
      }
    }
  }

  return obj;
}
