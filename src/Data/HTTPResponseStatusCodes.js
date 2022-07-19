export const SERVIDOR_APAGADO = 0

//Information responses
export const CONTINUE = 100

export const SWITCHING_PROTOCOLS = 101

export const PROCESSING = 102

export const EARLY_HINTS = 103

//Successful responses
export const OK = 200

export const CREATED = 201 

export const ACCEPTED = 202

export const NON_AUTORITATIVE_INFORMATION = 203 

export const NO_CONTENT = 204 

export const RESET_CONTENT = 205

export const PARTIAL_CONTENT = 206

export const MULTI_STATUS = 207

export const MOVED_PERMANENTLY = 301

export const FOUND = 302 

export const SEE_OTHER = 303

export const NOT_MODIFIED = 304

export const USE_PROXY = 305 

export const TEMPORARY_REDIRECT = 307

export const PERMANENT_REDIRECT = 308



//Client error responses
export const BAD_REQUEST = 400

export const UNAUTHORIZED = 401

export const PAYMENT_REQUIRED_EXPERIMENTAL = 402

export const FORBIDDEN = 403

export const NOT_FOUND = 404

export const METHOD_NOT_ALLOWED = 405

export const NOT_ACCEPTABLE = 406

export const AUTHENTICACION_REQUIRED = 407

export const REQUEST_TIMEOUT = 408

export const CONFLICT = 409 

export const GONE = 410

export const LENGTH_REQUIRED = 411

export const MISDIRECT_REQUEST = 421

export const UNPROCESABLE = 422



//The request was well-formed but was unable to be followed due to semantic errors.
export const FAILED_DEPENDENCY = 424

export const TOO_MANY_REQUEST = 429

export const REQUEST_HEADER_FIELDS_TOO_LARGE = 431 



//Server error responses
export const INTERNAL_SERVER_ERROR = 500

export const NOT_IMPLEMENTED = 501

export const BAD_GATEWAY = 502

export const SERVICE_UNAVAILABLE = 503

export const GATEWAY_TIMEOUT = 504

export const VERSION_NOT_SUPPORTED = 505

export const INSUFFICIENT_STORAGE = 507

export const LOOP_DETECTED = 508

export const NOT_EXTENDED = 510

export const NETWORK_AUTHENTICATION_REQUIRED = 511 
