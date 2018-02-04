/*
1. Make sure the proxy is running with: $ kubectl proxy --port=8080 (this can be done after other steps,
   but make sure it's done before running this file)
2. Run the cluster with: $ gcloud container clusters create guestbook --num-nodes=3
3. Deploy the yaml with: $ kubectl create -f guestbook-all-in-one.yaml
4. Delete the frontend service with: $ kubectl delete service frontend
5. The on deleted event will fire below
6. To manually restart the frontend service, run: $ kubectl create -f guestbook-all-in-one.yaml

*/




const KubeWatch = require('kube-watch').default;

const localUrl = 'http://localhost:8080';
const services = new KubeWatch('services', {
  url: localUrl,
});

services
  .on('added', event => {
    console.log('Service created with event:', event);
  })
  .on('modified', event => {
    // do something...
  })
  .on('deleted', event => {
    // ..do something else..
    console.log('Service deleted with event:', event);

  })
  .on('error', err => {
    console.error('Error:', err);
  });
