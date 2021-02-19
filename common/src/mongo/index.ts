import { ToObjectOptions } from 'mongoose';

export function standardMongoJSON(options?: Omit<ToObjectOptions, 'versionKey'>): ToObjectOptions {
  const customTransform = options && options.transform && options.transform;

  const transform = (doc, ret, options) => {
    ret.id = doc._id;
    delete ret._id;
    customTransform && customTransform(doc, ret, options);
  };

  return {
    ...options,
    versionKey: false,
    transform
  };
}
