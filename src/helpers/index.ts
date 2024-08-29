import Stack from '../sdk/entry';

export const getEntry = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'hero_banner',
    referenceFieldPath: '', 
  }) as any[][];

  return response[0][0];
};

export const getHeaderEntry = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'navigation',
    referenceFieldPath: '', 
  }) as any[][];

  return response[0][0];
};
