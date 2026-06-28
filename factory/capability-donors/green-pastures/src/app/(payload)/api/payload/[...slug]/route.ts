import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

import {
  payloadConfigured,
  payloadUnavailableResponse,
} from "@/lib/payload-env";

const payloadIsConfigured = payloadConfigured();

export const DELETE = payloadIsConfigured ? REST_DELETE(config) : payloadUnavailableResponse;
export const GET = payloadIsConfigured ? REST_GET(config) : payloadUnavailableResponse;
export const OPTIONS = payloadIsConfigured ? REST_OPTIONS(config) : payloadUnavailableResponse;
export const PATCH = payloadIsConfigured ? REST_PATCH(config) : payloadUnavailableResponse;
export const POST = payloadIsConfigured ? REST_POST(config) : payloadUnavailableResponse;
export const PUT = payloadIsConfigured ? REST_PUT(config) : payloadUnavailableResponse;
