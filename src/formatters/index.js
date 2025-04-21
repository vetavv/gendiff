const formatStylish = (data) => {
  const depth = '    ';
  const newLine = '\n';
  const space = ' '.repeat(3);

  const getStylishNode = (node, depthCount = 0) => {
    if (node.status.startsWith('nested-')) {
      const open = node.status === 'nested-object' ? '{' : '[';
      const close = node.status === 'nested-object' ? '}' : ']';
      const valuesStr = node.value.map(child => `${getStylishNode(child, depthCount + 1)}`).join(newLine);
      return `${space}${node.key}: ${open}${newLine}${valuesStr}${newLine}${depth.repeat(depthCount)}${space}${close}`;
    }
    else {
      let entries = [];
      if (node.status === 'add') entries = [`+ ${node.key}: ${node.value}`];
      else if (node.status === 'remove') entries = [`- ${node.key}: ${node.value}`];
      else if (node.status === 'changed') entries = [`- ${node.key}: ${node.oldValue}`, `+ ${node.key}: ${node.value}`];
      else entries = [`  ${node.key}: ${node.value}`];
      return depth.repeat(depthCount) + ' ' + entries.join(newLine + depth.repeat(depthCount) + ' ');
    }
  };

  return `{${newLine}${data.map(e => getStylishNode(e)).join(newLine)}${newLine}}`;
};

const formatPlain = (data) => {
  const getPlainNode = (node, path = []) => {
    const newPath = [...path, node.key];
    if (node.status === 'added') return `Property '${newPath.join('.')}' was added with value: ${node.value}`;
    if (node.status === 'removed') return `Property '${newPath.join('.')}' was removed`;
    if (node.status === 'changed') return `Property '${newPath.join('.')}' was updated. From '${node.oldValue}' to '${node.value}'`;
    if (node.status.startsWith('nested-')) return node.value.map(e => getPlainNode(e, newPath));
    return '';
  };

  return data.map(e => getPlainNode(e)).flat().filter(e => e !== '').join('\n');
};

const formatDiffData = (data, format) => {
  if (typeof format === 'undefined' || format === 'json') return JSON.stringify(data, null, 2);
  if (format === 'plain') return formatPlain(data);
  if (format === 'stylish') return formatStylish(data);
  throw new Error(`Format ${format} is not supported`);
};

export default formatDiffData;
