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

export default formatDataPlain;
