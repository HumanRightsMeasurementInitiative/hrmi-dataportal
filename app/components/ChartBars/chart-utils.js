export const chartLabelWidth = (
  size,
  hasLabelsSmall = true,
  minimal = false,
) => {
  if (size === 'small' && !hasLabelsSmall) return '0px';
  if (size === 'small' && hasLabelsSmall) return minimal ? '60px' : '100px';
  if (size === 'medium') return '120px';
  return '180px';
};

export const scoreAsideWidth = size => {
  if (size === 'small') return '40px';
  return '80px';
};
