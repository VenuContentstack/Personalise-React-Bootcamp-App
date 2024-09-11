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

export const getBannerEntry = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: 'hero_banner',
    referenceFieldPath: '',
  })) as any[][];

  return response[0][0];
};

export const getArticle = async (url:any) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'article',
    entryUrl:'/'+url,
    referenceFieldPath: '',
    jsonRtePath:'' 
  }) as any[][];
  return response[0][0];
};
