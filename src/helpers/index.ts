import Stack from '../sdk/entry';

export const getEntry = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: process.env.REACT_APP_CONTENTSTACK_HOMEPAGE_CONTENTTYPE_UID as string,
    referenceFieldPath: '',
  })) as any[][];

  return response[0][0];
};

export const getHeaderEntry = async () => {
  const response = (await Stack.getEntry({
    contentTypeUid: 'navigation',
    referenceFieldPath: '',
  })) as any[][];

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

export const getVariantEntry = async (variant: string | undefined) => {
  const environment = process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT;
  const stackApiKey = process.env.REACT_APP_CONTENTSTACK_API_KEY;
  const deliveryToken = process.env.REACT_APP_CONTENTSTACK_DELIVERY_TOKEN;
  const cmsApiHost = process.env.REACT_APP_CONTENTSTACK_DELIVERY_API_HOST;
  const cmsApiUrl = `https://${cmsApiHost}`;

  const homepageContentTypeUID = process.env.REACT_APP_CONTENTSTACK_HOMEPAGE_CONTENTTYPE_UID;
  const homepageEntryUID = process.env.REACT_APP_CONTENTSTACK_HOMEPAGE_ENTRY_UID;
  const variantHeader: HeadersInit = variant
    ? {
        'x-cs-variant-uid': deserializeVariantIds(variant),
      }
    : {};

  const result = await fetch(
    `${cmsApiUrl}/v3/content_types/${homepageContentTypeUID}/entries/${homepageEntryUID}?environment=${environment}`,
    {
      headers: {
        api_key: stackApiKey,
        access_token: deliveryToken,
        ...variantHeader,
      } as HeadersInit,
    }
  );

  const defaultEntry = (await result.json()).entry;

  return defaultEntry;
};

function deserializeVariantIds(variantsQueryParam: string) {
  return variantsQueryParam
    .split(',')
    .map((variantPair) => `cs_personalize_${variantPair.split('=').join('_')}`)
    .join(',');
}
