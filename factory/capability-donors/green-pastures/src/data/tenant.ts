import { companyProfile } from "@/data/company";

export const tenantConfig = {
  tenantId: "green-pastures",
  tenantName: companyProfile.shortName,
  publicDomain: "gptrek.com",
  adminDomain: "admin.gptrek.com",
  opsApiName: "gptrek-ops-api",
  teamAlertEmail: companyProfile.email,
} as const;

