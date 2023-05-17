# WebAuthn Test Web (React)
This repo contains the frontend for the WebAuthn-Test application. This is another implementation of
[webauthn-test-web](https://github.com/cmg2146/webauthn-test-api), but with React/Next.js instead of
Vue/Nuxt.js. Consult the [webauthn-test-web](https://github.com/cmg2146/webauthn-test-api) repo for
more details.

This frontend was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
and builds as a static export for production.

## Build
For development, make sure to clone the [webauthn-test-api](https://github.com/cmg2146/webauthn-test-api) repo and then
start the API (consult the repo Readme to learn how to start it). The frontend and API can be started in any order.
The frontend can be run using Docker Linux containers by executing the following command at the repo root:

```docker-compose up```

...and then opening your browser to https://localhost:10000.

If your browser warns the site is unsafe, trust the development certificate on your machine to avoid the warning again.
The app requires HTTPS, even in development, because it is a requirement for WebAuthn.

In production, an Azure DevOps pipeline (azure-pipelines.yml) automatically runs when changes are made to the main branch.
The pipeline requires the following variables to be configured to properly deploy the updated code:

* AZURE_SERVICE_CONNECTION
  * The name of the service connection to Azure. A service connection must be created in Azure DevOps
  for the pipeline to communicate with Azure.
* CONTAINER_REGISTRY_SERVICE_CONNECTION
  * The name of the service connection to the Azure Container Registry (ACR). Docker images are pushed to this ACR.
  A service connection must be created in Azure DevOps for the pipeline to communicate with the ACR.
* CONTAINER_REGISTRY_NAMESPACE
  * The host name of the container registry, for example "{your acr name}.azurecr.io"
* CONTAINER_IMAGE_REPOSITORY
  * The name of the Docker image, for example "webauthn-test/web"
* APP_NAME
  * The name of the Azure App Service that hosts the web frontend.

Currently, the variables above are set in a variable group in Azure DevOps.

### Configuration
The following build-time environment variables must be configured for proper operation:

* NODE_ENV
  * "development" or "production"

The following run-time environment variables must be configured for proper operation:
* API_URL
  * The URL to the API, i.e. http://localhost:10001. This is only needed by the reverse
  proxy.

For development, all environment variables have already been set in the docker compose file and can
be tweaked as needed. Some other environment variables, not listed above, are required for development and
have also been set in the docker-compose file.

In production, the variables are set in a variable group in Azure DevOps.
