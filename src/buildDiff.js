import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1 || {}), Object.keys(data2 || {}));
  const diff = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { key, status: 'removed', value: value1 };
    }

    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return { key, status: 'added', value: value2 };
    }

    if (value1 === value2) {
      return { key, status: 'unchanged', value: value1 };
    }

    if (_.isArray(value1) && _.isArray(value2)) {
      return { key, status: 'nested-array', value: buildDiff(value1, value2) };
    }

    else if (_.isObject(value1) && _.isObject(value2)) {
      return { key, status: 'nested-object', value: buildDiff(value1, value2) };
    }

    return { key, status: 'changed', oldValue: value1, value: value2 };
  });

  return diff;
};

export default buildDiff;
