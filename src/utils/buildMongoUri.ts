const buildMongoUri = (
  username?: string,
  password?: string,
  base?: string,
): string | undefined => {
  if (!username || !password || !base) {
    return undefined;
  }

  return base.replace('$username', username).replace('$password', password);
};

export default buildMongoUri;
