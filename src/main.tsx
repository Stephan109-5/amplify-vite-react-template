import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { BrowserRouter} from 'react-router-dom';
// import { Predictions } from "aws-amplify/predictions";

Amplify.configure(outputs);

Amplify.configure({
  ...Amplify.getConfig(),
  Predictions: {
        convert: {
          translateText: {
            defaults: {
              sourceLanguage: "en",
              targetLanguage: "zh-TW",
            },
            proxy: false,
            region: 'ap-southeast-2'
          },
    }}
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
