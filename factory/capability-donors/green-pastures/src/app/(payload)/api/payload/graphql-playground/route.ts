import config from "@payload-config";
import { GRAPHQL_PLAYGROUND_GET } from "@payloadcms/next/routes";

import {
  payloadConfigured,
  payloadUnavailableResponse,
} from "@/lib/payload-env";

export const GET = payloadConfigured()
  ? GRAPHQL_PLAYGROUND_GET(config)
  : payloadUnavailableResponse;
