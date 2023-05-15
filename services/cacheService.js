const cache = {};

const setCacheValue = (key, value, ttl) => {
  cache[key] = {
    value,
    ttl,
    createdAt: new Date(),
  };
};

const getCacheValue = (key) => {
  const cacheValue = cache[key];
  if (!cacheValue) {
    return null;
  }

  const { value, ttl, createdAt } = cacheValue;
  const now = new Date();
  const expiredAt = new Date(createdAt.getTime() + ttl);

  if (now > expiredAt) {
    delete cache[key];
    return null;
  }

  return value;
};

const deleteCacheValue = (key) => {
  delete cache[key];
};

module.exports = {
  setCacheValue,
  getCacheValue,
  deleteCacheValue,
};
