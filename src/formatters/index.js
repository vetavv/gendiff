const formatStylish = (data) => {
  const depth = '    ';
  const newLine = '\n';
  const space = ' '.repeat(4);

  const getStylishNode = (node, depthCount = 0) => {
    if (node.status.startsWith('nested-')) {
      const open = node.status === 'nested-object' ? '{' : '[';
      const close = node.status === 'nested-object' ? '}' : ']';
      const valuesStr = node.value.map(child => `${getStylishNode(child, depthCount + 1)}`).join(newLine);
      return `${depth.repeat(depthCount)}${space}${node.key}: ${open}${newLine}${valuesStr}${newLine}${depth.repeat(depthCount)}${space}${close}`;
    }
    else {
      let entries = [];
      const value = typeof node.value === 'string' ? `'${node.value}'` : typeof node.value === 'object' ? JSON.stringify(node.value) : `${node.value}`;
      const oldValue = typeof node.oldValue === 'string' ? `'${node.oldValue}'` : typeof node.oldValue === 'object' ? JSON.stringify(node.oldValue) : node.oldValue;
      if (node.status === 'add') entries = [` + ${node.key}: ${value}`];
      else if (node.status === 'remove') entries = [` - ${node.key}: ${value}`];
      else if (node.status === 'changed') entries = [` - ${node.key}: ${oldValue}`, ` + ${node.key}: ${value}`];
      else entries = [`   ${node.key}: ${value}`];
      return depth.repeat(depthCount) + ' ' + entries.join(newLine + depth.repeat(depthCount) + ' ');
    }
  };

  return `[${newLine}${data.map(e => getStylishNode(e)).join(newLine)}${newLine}]`;
};

const formatDataPlain = (data) => {
  const formatValue = (value) => {
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    else if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value.toString();
  };

  const formatNodePlain = (node, nodePath) => {
    const status = node.status;

    if (status.startsWith('nested-')) {
      const children = node.value;
      return children.map((child) => {
        const newPath = `${nodePath}.${child.key}`;
        return formatNodePlain(child, newPath);
      }).flat();
    }

    const value = formatValue(node.value);
    if (status === 'added') return `Property '${nodePath}' was added with value: ${value}`;
    if (status === 'removed') return `Property '${nodePath}' was removed`;
    if (status === 'changed') {
      const oldValue = formatValue(node.oldValue);
      return `Property '${nodePath}' was updated. From ${oldValue} to ${value}`;
    }
    return '';
  };

  return (
    data
      .map(e => formatNodePlain(e, e.key))
      .flat()
      .filter(e => e !== '')
      .join('\n')
  );
};

const formatDiffData = (data, format) => {
  if (typeof format === 'undefined' || format === 'json') return JSON.stringify(data, null, 2);
  if (format === 'plain') return formatDataPlain(data);
  if (format === 'stylish') return formatStylish(data);
  throw new Error(`Format ${format} is not supported`);
};

export default formatDiffData;
