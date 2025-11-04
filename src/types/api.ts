// Backend returns plain objects/arrays for most endpoints (not a {success,data} wrapper).
// ApiResponse kept as a generic alias to the expected response type.
export type ApiResponse<T = any> = T;