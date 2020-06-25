"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DesignResource {
    constructor(name, description, url) {
        this._name = name;
        this._description = description;
        this._url = url;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    get url() {
        return this._url;
    }
}
exports.default = DesignResource;
//# sourceMappingURL=DesignResource.js.map