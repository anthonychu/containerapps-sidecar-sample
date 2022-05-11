# Azure Container Apps sidecar example

## Deploy the app

1. Create a Container Apps environment.

    ```bash
    az containerapp env create --name demo --resource-group demo --location canadacentral

    # Get the environment id
    az containerapp env show --name demo --resource-group demo --query id
    ```

1. Open `app.yaml` and update the `managedEnvironmentId` with the value from the previous step. Save the file.

1. Create a container app.

    ```bash
    az containerapp create --name test-sidecar --resource-group demo --yaml app.yaml --query properties.configuration.ingress.fqdn
    ```

1. Open the app at its URL.

1. To observe the sidecar's streaming logs in real-time, run the following command:

    ```bash
    az containerapp logs show --name test-sidecar --resource-group demo --container sidecar --follow
    ```

1. Click the *Call sidecar* button.

    - The main app will call the sidecar app. The result is displayed on the page.

    - The sidecar logs should show that it processed the request.

1. Click the *Write a file* button.

    - The main app writes a file into a volume that it shares with the sidecar app.

    - The sidecar logs should show that it observed the file that was written.

