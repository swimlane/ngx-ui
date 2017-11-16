var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var InjectionRegisteryService = /** @class */ (function () {
    function InjectionRegisteryService(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegisteryService.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegisteryService.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegisteryService.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegisteryService.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType && compsByType.length) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegisteryService.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegisteryService.prototype.destroyByType = function (type) {
        var comps = this.components.get(type);
        if (comps && comps.length) {
            var i = comps.length - 1;
            while (i >= 0) {
                this.destroy(comps[i--]);
            }
        }
    };
    InjectionRegisteryService.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegisteryService.prototype.assignDefaults = function (bindings) {
        var inputs = __assign({}, this.defaults.inputs);
        var outputs = __assign({}, this.defaults.outputs);
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = __assign({}, inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = __assign({}, outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegisteryService.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    return InjectionRegisteryService;
}());
export { InjectionRegisteryService };
//# sourceMappingURL=injection-registery.service.js.map