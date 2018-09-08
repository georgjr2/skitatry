export const withSoftDelete = (incomingOptions) => {
  const options = {
    columnName: 'deleted_at',
    ...incomingOptions,
  }

  return (Model) => {
    class SDQueryBuilder extends Model.QueryBuilder {
      delete() {
        this.mergeContext({softDelete: true})
        return this.patch({[options.columnName]: Model.fn.now()})
      }

      hardDelete() {
        return super.delete()
      }

      undelete() {
        this.mergeContext({undelete: true})
        return this.patch({[options.columnName]: null})
      }

      whereDeleted() {
        return this.whereNotNull(`${this.modelClass().tableName}.${options.columnName}`)
      }

      whereNotDeleted() {
        return this.whereNull(`${this.modelClass().tableName}.${options.columnName}`)
      }
    }

    return class extends Model {
      static get QueryBuilder() {
        return SDQueryBuilder
      }

      static get namedFilters() {
        return {
          ...super.namedFilters,
          notDeleted: (builder) => {
            builder.whereNotDeleted()
          },
          deleted: (builder) => {
            builder.whereDeleted()
          },
        }
      }
    }
  }
}
