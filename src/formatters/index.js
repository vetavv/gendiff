const formatDiffData = (data, format) => {
  if (typeof format === 'undefined' || format === 'json') return data;
  throw new Error(`Format ${format} is not supported`);
};

export default formatDiffData;
