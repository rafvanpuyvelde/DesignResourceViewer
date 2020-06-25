"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DesignResourceCategory {
    constructor(name, description, resources) {
        this._name = name;
        this._description = description;
        this._resources = resources;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get resources() {
        return this._resources;
    }
}
exports.default = DesignResourceCategory;
//# sourceMappingURL=DesignResourceCategory.js.map