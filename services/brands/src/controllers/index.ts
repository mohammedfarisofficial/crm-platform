import { queryFunctions as queryFunctionsV1 } from "./v1/query";
import { mutateFunctions as mutateFunctionsV1 } from "./v1/mutate";
import { mutateFunctions as mutateFunctionsV2 } from "./v2/mutate";

import { queryFunctions as queryFunctionsV2 } from "./v2/query";

const brandsControllerV1 = {
    ...queryFunctionsV1,
    ...mutateFunctionsV1,
}
const brandsControllerV2 = {
    ...queryFunctionsV2,
    ...mutateFunctionsV2,
}

export { brandsControllerV1, brandsControllerV2 };
