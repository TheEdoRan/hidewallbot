import { resolve } from "path";

import moduleAlias from "module-alias";

moduleAlias.addAlias("@", resolve(__dirname, ".."));
