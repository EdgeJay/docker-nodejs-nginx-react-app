import test from 'ava';
import { locateDotEnvPath, initDotEnv, getNodePort, ParsedOutput } from './env';

test('locateDotEnvPath should be able to traverse up directory until dotenv file is found', t => {
  const path = locateDotEnvPath('.env.test');
  t.true(path.endsWith('/.env.test'));
});

test('getNodePort should be able to extract and return NODE_PORT', t => {
  const path = locateDotEnvPath('.env.test');
  const parsed = initDotEnv(path) || ({} as ParsedOutput);
  const nodePort = getNodePort(parsed);
  t.is(nodePort, '8000');
});
