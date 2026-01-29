import { IsNull, Not } from "typeorm";
import { httpCode } from "../constants/httpCodes";
import { commonMessage } from "../constants/messages/common";
import { IUKnownObject } from "../utilities/Router/request";

export class BaseService {
  model: any;
  modelProps?: IUKnownObject; // populate properties, ...
  paramsLabel?: string;

  constructor(model: any, modelProps?: IUKnownObject, paramsLabel?: string) {
    this.model = model;
    this.modelProps = modelProps;
    this.paramsLabel = paramsLabel;
  }

  public async createManyFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;
      try {
        const { body } = req;
        const data = await _model.save(body);
        resolve({
          status: httpCode.CREATED,
          message: commonMessage.CREATED,
          data,
        });
      } catch (error: any) {
        console.log("Create error::", error);
        reject({
          status: httpCode.INTERNAL_SERVER_ERROR,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }

  public async getManyFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;
      try {
        const { params, query, relation, where, select } = req;
        let customQuery: any = {
          where: { isDeleted: false, isActive: true, ...where },
        };

        const pagination = {
          page: 0,
          per_page: 10,
          total: 0,
        };

        if (query?.sort_by && query?.sort_by != "null") {
          customQuery.order = {};
          customQuery.order[String(query?.sort_by)] = query?.sort_type
            ? query?.sort_type
            : "asc";
        }
        if (query?.where) {
          customQuery.where = {
            ...customQuery.where,
            ...JSON.parse(query.where),
          };
          delete query.where;
        }
        if (query?.page) pagination.page = Number(query?.page);
        if (query?.per_page)
          pagination.per_page =
            Number(query?.per_page) == -1 ? 0 : Number(query?.per_page);

        customQuery.skip = pagination.page * pagination.per_page;
        customQuery.take = pagination.per_page;
        delete query?.page;
        delete query?.per_page;
        delete query?.sort_by;
        delete query?.sort_type;
        delete query?.total;
        if (params) {
          customQuery.where = {
            ...customQuery.where,
            ...params,
          };
        }

        Object.keys(query).forEach((qry) => {
          let spl = qry.split(".");
          spl.push(query[qry]);

          customQuery.where = {
            ...customQuery.where,
            ...arrayToNestedObject(spl),
          };
        });
        if (query) {
          customQuery.where = {
            ...customQuery.where,
          };
        }
        if (relation) {
          customQuery.relations = relation;
        }

        // Object.keys(customQuery.where).forEach((key) => {
        //   customQuery.where[key] = customQuery.where[key] == "null" ? IsNull() : customQuery.where[key];
        //   customQuery.where[key] = customQuery.where[key] == null ? IsNull() : customQuery.where[key];
        //   customQuery.where[key] = customQuery.where[key] == "notNull" ? Not(IsNull()) : customQuery.where[key];
        // });
        // customQuery.where=checkNull(customQuery.where)

        // function checkNull(json:any){
        //     Object.keys
        // }
        if (customQuery.where.isActive == "all") {
          delete customQuery.where.isActive;
        }
        function checkNull(json: any) {
          let keys = Object.keys(json);
          for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (typeof json[key] != "object") {
              json[key] =
                json[key] == "null" || json[key] == null ? IsNull() : json[key];
              json[key] = json[key] == "notNull" ? Not(IsNull()) : json[key];
            } else {
              json[key] = checkNull(json[key]);
            }
          }
          return json;
        }
        customQuery.where = checkNull(customQuery.where);

        const data = await _model.find(customQuery);
        delete customQuery.skip;
        delete customQuery.take;
        const count = await _model.count(customQuery);

        resolve({
          status: httpCode.OK,
          message: commonMessage.SUCCESS,
          data,
          page: pagination.page,
          per_page: pagination.per_page,
          total: count,
        });
      } catch (error: any) {
        console.log(error);
        reject({
          status: httpCode.INTERNAL_SERVER_ERROR,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }

  public async getOneFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;

      try {
        const { params, query, relation } = req;
        let customQuery: any = {
          where: { isDeleted: false, isActive: true },
        };

        if (params) {
          customQuery.where = {
            ...customQuery.where,
            ...params,
          };
        }

        if (query) {
          customQuery.where = {
            ...customQuery.where,
            ...query,
          };
        }
        if (relation) {
          customQuery.relations = relation;
        }
        if (customQuery.where.isActive == "all") {
          delete customQuery.where.isActive;
        }
        const data = await _model.findOne(customQuery);

        resolve({
          status: httpCode.OK,
          message: commonMessage.SUCCESS,
          data,
        });
      } catch (error: any) {
        reject({
          status: httpCode.INTERNAL_SERVER_ERROR,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }

  public async updateFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;

      try {
        const { body, params } = req;
        let data = await _model.findOneBy({
          ...params,
          isDeleted: false,
        });
        if (!data)
          return reject({
            status: httpCode.NOT_FOUND,
            message: commonMessage.NOT_FOUND,
          });

        delete body.createdAt;
        delete body.updatedAt;
        delete body.deletedAt;
        data = await _model.save({ ...data, ...body });

        resolve({
          status: httpCode.OK,
          message: commonMessage.UPDATED,
          data,
        });
      } catch (error: any) {
        reject({
          status: httpCode.INTERNAL_SERVER_ERROR,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }
  public async deleteFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;

      try {
        const { params } = req;
        let data = await _model.findOneBy({
          ...params,
          isDeleted: false,
        });
        if (!data)
          return reject({
            status: httpCode.NOT_FOUND,
            message: commonMessage.NOT_FOUND,
          });

        data.deletedAt = new Date();
        data.isDeleted = true;
        data = await _model.save(data);
        return resolve({
          status: httpCode.OK,
          message: commonMessage.DELETED,
          data,
        });
      } catch (error: any) {
        reject({
          status: httpCode.INTERNAL_SERVER_ERROR,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }
  public async deleteManyFn(req: IUKnownObject, model?: any) {
    return new Promise(async (resolve, reject) => {
      let _model = model || this.model;

      try {
        const { params, query } = req;
        let data = await _model.findBy({
          ...params,
          ...query,
          isDeleted: false,
        });
        if (!data)
          return reject({
            status: httpCode.NOT_FOUND,
            message: commonMessage.NOT_FOUND,
          });
        data.forEach((element: any) => {
          element.deletedAt = new Date();
          element.isDeleted = true;
        });

        data = await _model.save(data);
        resolve({
          status: httpCode.OK,
          message: commonMessage.DELETED,
          data,
        });
      } catch (error: any) {
        reject({
          status: httpCode.BAD_REQUEST,
          message: commonMessage.SOMETHING_WENT_WRONG,
        });
      }
    });
  }
}
function arrayToNestedObject(arr: any) {
  let result = {};
  let current: any = result;

  for (let i = 0; i < arr.length - 1; i++) {
    current[arr[i]] = {};
    if (i === arr.length - 2) {
      current[arr[i]] = arr[i + 1]; // Assign the last element as the value
    } else {
      current = current[arr[i]]; // Move deeper into the object
    }
  }

  return result;
}
