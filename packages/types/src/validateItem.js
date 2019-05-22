import * as types from '.'

// support JS objects coming in, since all validators expect JSON
const serialize = (v) => v && typeof v.toJSON === 'function' ? v.toJSON() : v

const requiredValidator = types.any.validators.required

const validateField = async (path, field, value) => {
  if (!field) return true
  const errors = []
  const { type, items, validation } = field
  value = serialize(value)
  const exists = await requiredValidator.test(value)

  // if not required and value is empty, bail out
  if ((!validation || !validation.required) && !exists) {
    return true
  }

  // check validation first
  if (validation && validation.required && !exists) {
    errors.push({
      path,
      value,
      message: 'This field is required'
    })
    return errors
  }

  // top-level type check
  const result = await types[type].test(value)
  if (result !== true) {
    errors.push({
      path,
      value,
      message: result || `Not a valid ${type} value`
    })
    return errors
  }

  // check all type specific validators
  if (validation) {
    await Promise.all(Object.keys(validation).map(async (k) => {
      const param = validation[k]
      const spec = types[type].validators[k]
      const vresult = await spec.test(value, param)
      if (vresult !== true) {
        errors.push({
          path,
          validator: k,
          value,
          // TODO: built-in types should provide good messages usable for UI
          message: vresult || `Failed ${spec.name} validation`
        })
      }
    }))
  }

  // subitems
  if (items) {
    await Promise.all(value.map(async (subvalue, index) => {
      const fieldErrors = await validateField([ ...path, index ], items, serialize(subvalue))
      if (fieldErrors !== true) errors.push(...fieldErrors)
    }))
  }

  if (errors.length === 0) return true
  return errors
}

export default async (dataType, item) => {
  const errors = []
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    errors.push({ value: item, message: 'Not a valid top-level object' })
    return errors
  }

  await Promise.all(Object.keys(dataType.schema).map(async (k) => {
    const fieldErrors = await validateField([ k ], dataType.schema[k], item[k])
    if (fieldErrors !== true) errors.push(...fieldErrors)
  }))
  if (errors.length === 0) return true
  return errors
}
