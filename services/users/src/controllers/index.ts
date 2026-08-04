import { queryFunctions } from "./query";
import { mutateFunctions } from "./mutate";

const usersController = {
    ...queryFunctions,
    ...mutateFunctions,
}

export { usersController };