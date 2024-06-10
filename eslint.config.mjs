import * as globals from "globals";
import { configs as pluginJsConfigs } from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    languageOptions: { globals: globals.browser },
    ...pluginJsConfigs.recommended,
    ...fixupConfigRules(pluginReactConfig),
  },
];
