
export type Administration = 'Imbituba' | 'Laguna' | 'Tubarão' | 'Criciúma';

export type OrganLocation = 'Salão da igreja' | 'Sala de música' | 'Espaço infantil' | 'Outro';

export interface Location {
  id: string;
  name: string;
  adm: Administration;
}

export interface Organ {
  id: string;
  locationId: string;
  churchLocation: OrganLocation;
  model: string;
  serialNumber: string;
  patrimonyNumber: string;
  createdAt: string;
}

export interface MaintenancePart {
  description: string;
  reason: string;
  observation: string;
}

export interface Maintenance {
  id: string;
  organId: string;
  date: string;
  technicians: string[]; // Max 2
  occurrence: string;
  hasPartExchange: boolean;
  partExchangeDetails?: MaintenancePart;
  photos: string[]; // base64 strings
}

export interface DeletedItem {
  id: string;
  type: 'organ' | 'maintenance';
  data: Organ | Maintenance;
  reason: string;
  deletedAt: string;
  metadata?: {
    locationName?: string;
    adm?: string;
  };
}

export interface AppState {
  organs: Organ[];
  maintenances: Maintenance[];
  locations: Location[];
  deletedItems: DeletedItem[];
}
