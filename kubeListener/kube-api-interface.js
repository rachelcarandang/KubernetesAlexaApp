/*
1. Follow steps https://cloud.google.com/kubernetes-engine/docs/tutorials/guestbook tools installed and cluster created
   (up until Step 1: Set up a Redis master, then follow the below)
2. Make sure the proxy is running with: $ kubectl proxy --port=8080 (this can be done after other steps,
   but make sure it's done before running this file)
3. Run the cluster with: $ gcloud container clusters create guestbook --num-nodes=3
4. Deploy the yaml with: $ kubectl create -f guestbook-all-in-one.yaml
5. Delete the frontend service with: $ kubectl delete service frontend
6. The on deleted event will fire below
7. To manually restart the frontend service, run: $ kubectl create -f guestbook-all-in-one.yaml

*/

const request = require('request');
const KubeWatch = require('kube-watch').default;
const GoogleCloudMessaging = require('./GoogleCloudMessaging');
const moment = require('moment');


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
    // send GCM push
    const google = new GoogleCloudMessaging();
    google.sendNotificationToDevice();

    // const { name }  = event.metadata;
    // const { app } = event.meta.data.labels;
    // const now = moment();
    // const formattedTime = now.calendar();

    // Example Alexa notfication:
    // "Your <name> service for your <app> application went down <formattedTime>!"
  })
  .on('error', err => {
    console.error('Error:', err);
  });
