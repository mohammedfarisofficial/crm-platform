import { queryFunctions as queryFunctionsV1 } from "./v1/query";
import { mutateFunctions as mutateFunctionsV1 } from "./v1/mutate";
import { queryFunctions as queryFunctionsV2 } from "./v2/query";
import { mutateFunctions as mutateFunctionsV2 } from "./v2/mutate";

const usersControllerV1 = {
    ...queryFunctionsV1,
    ...mutateFunctionsV1,
}

const usersControllerV2 = {
    ...queryFunctionsV2,
    ...mutateFunctionsV2,
}

export { usersControllerV1, usersControllerV2 };
