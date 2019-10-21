const users = [{
  id: 1,
  name: 'Test user',
  email: 'your@email.com',
  password: '$2b$10$ahs7h0hNH8ffAVg6PwgovO3AVzn1izNFHn.su9gcJnUWUzb2Rcb2W' // = ssseeeecrreeet
}]

const todos = [
  {
    id: 1,
    user: 1,
    name: 'Do something'
  },
  {
    id: 2,
    user: 1,
    name: 'Do something else'
  },
  {
    id: 3,
    user: 2,
    name: 'Remember the milk'
  }
]

const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
    port: 5000,
    host: 'localhost'
  })

  await server.start();

  console.log('Server runnning on %s', server.info.uri);
};

process.on('unhandleRejection', err => {
  console.log(err);
  process.exit(1);
})

init();