import _ from 'lodash';

const makeDiffUnit = (key, status, oldValue, newValue) => ({
  key,
  status,
  ...(oldValue !== undefined && oldValue !== newValue && { oldValue }),
  ...(newValue !== undefined && { newValue }),
});

const buildDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1 || {}), Object.keys(data2 || {}));
  const diff = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    let status = '';

    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      status = 'removed';
    }

    else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      status = 'added';
    }

    else if (value1 === value2) {
      status = 'unchanged';
    }

    else if (_.isArray(value1) && _.isArray(value2)) {
      return { [key]: buildDiff(value1, value2) };
    }

    else if (_.isObject(value1) && _.isObject(value2)) {
      return buildDiff(value1, value2);
    }

    else {
      status = 'changed';
    }

    return makeDiffUnit(key, status, value1, value2);
  });

  return diff;
};

export default buildDiff;
