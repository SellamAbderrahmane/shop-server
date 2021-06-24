import { Model } from "mongoose"

export abstract class IService {
  abstract getAll(query: any): any
  abstract get(id: string): any
  abstract insert(data: any): any
  abstract update(id: string, data: any): any
  abstract delete(id: string): any
}

export class Service implements IService {
  model: Model<any>

  constructor(model: Model<any>) {
    this.model = model
  }

  async getAll(query: any = {}) {
    let { skip, limit, sortBy } = query

    skip = skip ? Number(skip) : 0
    limit = limit ? Number(limit) : 10
    sortBy = sortBy ? sortBy : { createdAt: -1 }

    delete query.skip
    delete query.limit
    delete query.sortBy
    console.log(skip)
    if (query._id) {
      try {
        query._id = query._id
      } catch (error) {
        throw new Error("Not able to generate mongoose id with content")
      }
    }

    try {
      let items = await this.model.find(query).sort(sortBy).skip(skip).limit(limit)

      let total = await this.model.countDocuments(query)

      return {
        items,
        totalCount: total,
      }
    } catch (errors) {
      throw errors
    }
  }

  async get(id: string) {
    try {
      let item = await this.model.findById(id)
      if (!item) {
        let error = new Error("Item not found")
        // error.statusCode = 404
        throw error
      }

      return item
    } catch (errors) {
      throw errors
    }
  }

  async insert(data: any) {
    try {
      let item = await this.model.create(data)
      if (item) {
        return item
      } else {
        throw new Error("Something wrong happened")
      }
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: any) {
    try {
      let item = await this.model.findByIdAndUpdate(id, data, { new: true })
      return item
    } catch (errors) {
      throw errors
    }
  }

  async delete(id: string) {
    try {
      let item = await this.model.findByIdAndDelete(id)
      if (!item) {
        let error = new Error("Item not found")
        // error.statusCode = 404
        throw error
      } else {
        return {
          item,
        }
      }
    } catch (errors) {
      throw errors
    }
  }
}

export class ServiceError extends Error {
  message: string
  constructor(message: string) {
    super(message)
    this.message = message
    this.name = "ValidationError"
  }
}
