import config from "@payload-config";
import { GRAPHQL_POST } from "@payloadcms/next/routes";

import {
  payloadConfigured,
  payloadUnavailableResponse,
} from "@/lib/payload-env";

export const POST = payloadConfigured() ? GRAPHQL_POST(config) : payloadUnavailableResponse;
