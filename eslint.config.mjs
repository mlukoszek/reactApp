import * as globals from "globals";
import { configs as pluginJsConfigs } from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
  {
    languageOptions: { globals: globals.browser },
    ...pluginJsConfigs.recommended,
    ...fixupConfigRules(pluginReactConfig),
    rules: {
      'no-unused-vars': 'off', // Lub 'off', jeśli nie chcesz, aby ta reguła była aktywna
      // Dodaj inne reguły, które chcesz skonfigurować
    },
  },
];
