"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
// Searchable Filde Example
// export const tourSearchableFild = ["title" , "description" , "location"];
const excludeFild = [""];
// example
// const excludeFild = ["searchTerm" , "sort" , "fields" , "page" , "limit" , "transection_id" , "amount" , "status"];
class QueryBuilder {
    queryModel;
    query;
    constructor(queryModel, query) {
        this.queryModel = queryModel;
        this.query = query;
    }
    ;
    filter() {
        const filter = { ...this.query };
        for (const value of excludeFild) {
            delete filter[value];
        }
        ;
        this.queryModel = this.queryModel.find(filter);
        return this;
    }
    ;
    search(searchableFild) {
        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableFild.map((fild) => ({ [fild]: { $regex: searchTerm, $options: "i" } }))
        };
        this.queryModel = this.queryModel.find(searchQuery);
        return this;
    }
    ;
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    }
    ;
    select() {
        const fields = this.query.fields?.split(",").join(" ") || "";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.queryModel = this.queryModel.limit(limit).skip(skip);
        return this;
    }
    ;
    build() {
        return this.queryModel;
    }
    ;
    async getMeta() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalDocumtnt = await this.queryModel.model.countDocuments();
        const totalPage = Math.ceil(totalDocumtnt / limit);
        return { page, limit, total: totalDocumtnt, totalPage };
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map