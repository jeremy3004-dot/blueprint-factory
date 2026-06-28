-- D1 schema for the trekking ops Worker.
-- Run with: wrangler d1 migrations apply gptrek-ops --remote

CREATE TABLE IF NOT EXISTS tenants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS guides (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Trekking guide',
  gender TEXT,
  regions_json TEXT NOT NULL DEFAULT '[]',
  languages_json TEXT NOT NULL DEFAULT '[]',
  certifications_json TEXT NOT NULL DEFAULT '[]',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_guides_tenant_slug ON guides(tenant_id, slug);
CREATE INDEX IF NOT EXISTS idx_guides_tenant_active ON guides(tenant_id, active);

CREATE TABLE IF NOT EXISTS booking_requests (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'proposal_sent', 'confirmed', 'lost')),
  source TEXT NOT NULL DEFAULT 'web' CHECK (source IN ('web', 'admin', 'import')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  departure_window TEXT NOT NULL,
  route_slug TEXT NOT NULL,
  group_size TEXT NOT NULL,
  style TEXT NOT NULL,
  addons_json TEXT NOT NULL DEFAULT '[]',
  notes TEXT,
  metadata_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_booking_requests_tenant_created ON booking_requests(tenant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_requests_tenant_status ON booking_requests(tenant_id, status);

CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  booking_request_id TEXT,
  name TEXT NOT NULL,
  route_slug TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'held' CHECK (status IN ('draft', 'held', 'confirmed', 'completed', 'cancelled')),
  traveler_count INTEGER NOT NULL DEFAULT 1,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_request_id) REFERENCES booking_requests(id) ON DELETE SET NULL,
  CHECK (start_date <= end_date)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_trips_booking_request ON trips(tenant_id, booking_request_id) WHERE booking_request_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_trips_tenant_dates ON trips(tenant_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_trips_tenant_status ON trips(tenant_id, status);

CREATE TABLE IF NOT EXISTS trip_guides (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  trip_id TEXT NOT NULL,
  guide_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Lead guide',
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE,
  CHECK (start_date <= end_date)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_trip_guides_unique ON trip_guides(tenant_id, trip_id, guide_id);
CREATE INDEX IF NOT EXISTS idx_trip_guides_guide_dates ON trip_guides(tenant_id, guide_id, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_trip_guides_trip ON trip_guides(tenant_id, trip_id);

CREATE TABLE IF NOT EXISTS guide_unavailability (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  guide_id TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (guide_id) REFERENCES guides(id) ON DELETE CASCADE,
  CHECK (start_date <= end_date)
);

CREATE INDEX IF NOT EXISTS idx_guide_unavailability_dates ON guide_unavailability(tenant_id, guide_id, start_date, end_date);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  actor_type TEXT NOT NULL DEFAULT 'system',
  actor_id TEXT,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_audit_events_entity ON audit_events(tenant_id, entity_type, entity_id, created_at DESC);

INSERT OR IGNORE INTO tenants (id, name) VALUES ('green-pastures', 'Green Pastures Adventures');

INSERT OR IGNORE INTO guides (
  id, tenant_id, slug, name, role, gender, regions_json, languages_json, certifications_json
) VALUES
  (
    'maya-sherpa',
    'green-pastures',
    'maya-sherpa',
    'Maya Sherpa',
    'Lead Everest & women-only departures guide',
    'Women-led',
    '["Everest Base Camp","Gokyo","Altitude confidence coaching"]',
    '["English","Nepali","Sherpa"]',
    '["Licensed trekking guide","Wilderness first aid"]'
  ),
  (
    'sushil-nepali',
    'green-pastures',
    'sushil-nepali',
    'Sushil Nepali',
    'Mustang-born mountain guide and coffee trail host',
    'Men-led',
    '["Upper Mustang","Annapurna","Coffee farm add-ons"]',
    '["English","Nepali","Hindi"]',
    '["Licensed trekking guide","High-altitude safety"]'
  ),
  (
    'asha-gurung',
    'green-pastures',
    'asha-gurung',
    'Asha Gurung',
    'Annapurna circuit and family travel lead',
    'Women-led',
    '["Annapurna Base Camp","Poon Hill","Family departures"]',
    '["English","Nepali","Hindi"]',
    '["Licensed trekking guide","Wilderness first aid"]'
  );
