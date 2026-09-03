import { queryFunctions as queryFunctionsV1 } from "./v1/query";
import { mutateFunctions as mutateFunctionsV1 } from "./v1/mutate";

const brandsControllerV1 = {
    ...queryFunctionsV1,
    ...mutateFunctionsV1,
}

export { brandsControllerV1 };
