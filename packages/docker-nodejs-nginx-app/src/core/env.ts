import findConfig from 'find-config';
import dotenv, { DotenvParseOutput } from 'dotenv';

export interface ParsedOutput extends DotenvParseOutput {
  NODE_PORT: string;
  DB_CLIENT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
}

export function locateDotEnvPath(filename: string): string {
  return findConfig(filename);
}

const DEFAULT_PATH = locateDotEnvPath('.env');

/**
 * Loads .env file from specified path and returns parsed dotenv variables
 * as fields in DotenvParseOutput.
 *
 * Throws error if parsing fails.
 *
 * @param dotenvPath Path to .env file
 */
export function initDotEnv(dotenvPath: string = DEFAULT_PATH): ParsedOutput | undefined {
  const { error, parsed } = dotenv.config({
    path: dotenvPath,
  });

  // do not proceed as app cannot function properly
  // useable dotenv values.
  if (error) {
    throw error;
  }

  return parsed as ParsedOutput;
}

/**
 * Extracts and returns node port value that server app should listen at.
 *
 * @param param0 Object that should contain at least NODE_PORT field
 */
export function getNodePort({ NODE_PORT }: ParsedOutput): string {
  return NODE_PORT;
}
