import {pick} from 'lodash'


const validFields = ['validate', 'handler', 'meta']
export const route = (method, path, controller) => ({method, path, ...pick(controller, validFields)})
