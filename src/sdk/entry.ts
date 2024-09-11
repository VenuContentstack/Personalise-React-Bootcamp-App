/* eslint-disable no-undef */
import * as contentstack from 'contentstack';

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_CONTENTSTACK_API_KEY || '',
  delivery_token: process.env.REACT_APP_CONTENTSTACK_DELIVERY_TOKEN || '',
  environment: process.env.REACT_APP_CONTENTSTACK_ENVIRONMENT || '',
});

if (process.env.REACT_APP_CONTENTSTACK_API_HOST) {
  Stack.setHost(process.env.REACT_APP_CONTENTSTACK_API_HOST);
}

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath }: { contentTypeUid: string; referenceFieldPath: string }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .toJSON()
        .find()
        .then(
          (result) => {
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    jsonRtePath,
  }: {
    contentTypeUid: string;
    entryUrl: string;
    referenceFieldPath: string;
    jsonRtePath: string;
  }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
