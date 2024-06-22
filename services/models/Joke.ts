export interface JokeServiceOptions {
  host: string;
  path: string;
  method: string;
  headers: {
    Accept: string;
    'User-Agent': string;
    'X-Api-Key'?: string;
  }
}

export interface JokeService {
  options: JokeServiceOptions;
  process: (body: any) => string;
}