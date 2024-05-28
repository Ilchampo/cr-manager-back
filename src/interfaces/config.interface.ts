export interface IMongoAtlasConfig {
  username?: string;
  password?: string;
  base?: string;
}

export interface IConfig {
  port?: string | number;
  corsOrigins?: string | string[];
  mongo: IMongoAtlasConfig;
}
