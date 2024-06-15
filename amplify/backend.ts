import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

// defineBackend({
//   auth,
//   data,
//   storage
// });

const backend = defineBackend({
  auth,
  data,
  storage
});

// Configure a policy for the required use case.
// The actions included below cover all supported ML capabilities
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "translate:TranslateText",
      "polly:SynthesizeSpeech",
      "transcribe:StartStreamTranscriptionWebSocket",
    ],
    resources: ["*"],
  })
);

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        translateText: {
          defaults: {
            sourceLanguage: "en",
            targetLanguage: "es",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        speechGenerator: {
          defaults: {
            voiceId: "Ivy",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
        transcription: {
          defaults: {
            language: "en-US",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
      }
    },
  },
});