ALTER TABLE booking_requests
ADD COLUMN pipeline_stage TEXT NOT NULL DEFAULT 'first_contact';

UPDATE booking_requests
SET pipeline_stage = CASE status
  WHEN 'new' THEN 'first_contact'
  WHEN 'contacted' THEN 'qualified'
  WHEN 'proposal_sent' THEN 'proposal'
  WHEN 'confirmed' THEN 'scheduled'
  WHEN 'lost' THEN 'lost'
  ELSE 'first_contact'
END
WHERE pipeline_stage = 'first_contact';

CREATE INDEX IF NOT EXISTS idx_booking_requests_tenant_pipeline_stage
ON booking_requests(tenant_id, pipeline_stage, updated_at DESC);
