// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/',
  baseUrlSocket: 'http://localhost:5000/',
  restUrl: 'http://localhost:8000/',
  mqttUrl: 'mqtt://localhost:1883'
};

// export const environment = {
//   production: false,
//   baseUrl: 'http://192.168.1.42:3000/',
//   baseUrlSocket: 'http://192.168.1.42:5000/',
//   restUrl: 'http://192.168.1.42:8000/',
// };

