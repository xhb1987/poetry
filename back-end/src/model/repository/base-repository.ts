import { Document, Model } from "mongoose";

export interface IRead<T extends Document> {
  findById: (
    id: string,
    callback?: (error: any, result: T) => void
  ) => Promise<T>;

  find: (callback?: (error: any, result: T[]) => void) => Promise<T[]>;
}

export interface IWrite<T extends Document> {
  save: (item: T, callback?: (error: any, result: T) => void) => Promise<T>;
}

declare interface IRepository<T extends Document> extends IRead<T>, IRead<T> {}

class Repository<T extends Document> implements IRepository<T> {
  private _schema: Model<Document>;
  constructor(schema: Model<Document>) {
    this._schema = schema;
  }

  async findById(
    id: string,
    callback?: (error: any, result: T) => void
  ): Promise<T> {
    let self = this;
    return new Promise((resolve, reject) => {
      self._schema.findById(id, (err, res) => {
        if (callback) {
          callback(err, <T>res);
        }

        if (err) {
          reject(err);
        } else {
          resolve(<T>res);
        }
      });
    });
  }

  async find(callback?: (error: any, result: T[]) => void): Promise<T[]> {
    let self = this;
    return new Promise((resolve) => {
      self._schema.find((err, res) => {
        if (callback) {
          callback(err, <T[]>res);
        }
        resolve(<T[]>res);
      });
    });
  }

  async findByName(
    name?: string,
    callback?: (error: any, result: T[]) => void
  ): Promise<T[]> {
    let self = this;
    return new Promise((resolve) => {
      self._schema.find({ name }, (err, res) => {
        if (callback) {
          callback(err, <T[]>res);
        }

        resolve(<T[]>res);
      });
    });
  }

  async save(item: T, callback?: (error: any, result: T) => void): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      item.save((err, res) => {
        console.log("1111111");
        if (callback) {
          callback(err, <T>res);
        }

        if (err) {
          return reject(err);
        } else {
          return resolve(<T>res);
        }
      });
    });
  }

  create(item: T, callback?: (error: any, result: T) => void): Promise<T> {
    let self = this;
    let p = new Promise<T>((resolve, reject) => {
      self._schema.create(item, (err: any, res: T) => {
        if (callback) {
          callback(err, <T>res);
        }
        if (err) {
          reject(err);
        } else {
          resolve(<T>res);
        }
      });
    });

    return p;
  }
}

export default Repository;
