import { useState } from "react";

//Define our variables for Azure access
const ApiKey = import.meta.env.VITE_API_KEY;
const AzureEndpoint = import.meta.env.VITE_ENDPOINT_NAME;

async function getData(image)  {
        try {
          const fetchOptions = {
            method: "POST",
            timeout: 50000,
            headers: {
              "Ocp-Apim-Subscription-Key": ApiKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: image,
            }),
          };
          const response = await fetch(
            `${AzureEndpoint}computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,caption,denseCaptions,objects`,
            fetchOptions,
          );
          console.error("Fetch success");
          const parsedData = await response.json();
          return parsedData;
        } catch (error) {
          console.error("There is an error during fetch:", error);
        }
      }

export default getData;