export type SystemType = 'on-grid' | 'off-grid' | 'hybrid';

export type BosCategory =
  | 'dc-cable'
  | 'ac-cable'
  | 'dcdb'
  | 'acdb'
  | 'spd'
  | 'earthing'
  | 'mc4'
  | 'net-meter-kit';

export type BosTier = 'budget' | 'standard' | 'premium';
export type Tier = 'budget' | 'standard' | 'premium';

export interface BosSpec {
  label: string;
  value: string;
}

export interface BosComponent {
  id: string;
  category: BosCategory;
  tier: BosTier;
  brand: string;
  model: string;
  description: string;
  specs: BosSpec[];
  pricePerUnit: number;
  unitLabel: string;
  certification: string[];
  compatible: SystemType[];
  highlight?: string;
}

export interface SolarPanel {
  id: string;
  brand: string;
  model: string;
  tier: Tier;
  type: 'Mono PERC' | 'Bifacial Mono PERC' | 'Polycrystalline' | 'TOPCon' | 'HJT';
  wattage: number;
  efficiency: number;
  voc: number;
  isc: number;
  vmp: number;
  imp: number;
  tempCoeff: number;
  dimensions: string;
  weight: number;
  frameType: string;
  cellCount: number;
  warranty: { product: number; performance: number };
  certification: string[];
  pricePerWatt: number;
  origin: string;
  image?: string;
  highlight?: string;
}

export interface Inverter {
  id: string;
  brand: string;
  model: string;
  tier: Tier;
  type: 'String' | 'Microinverter' | 'Hybrid' | 'Off-Grid' | 'On-Grid';
  capacity: number;
  phase: '1-Phase' | '3-Phase';
  mpptTrackers: number;
  maxPvVoltage: number;
  efficiency: number;
  display: string;
  protection: string;
  connectivity: string[];
  warranty: number;
  price: number;
  compatible: SystemType[];
  certification: string[];
  image?: string;
  highlight?: string;
}

export interface Battery {
  id: string;
  brand: string;
  model: string;
  tier: Tier;
  type: 'Tubular Lead-Acid' | 'AGM VRLA' | 'Lithium LFP' | 'Lithium NMC';
  capacity: number;
  voltage: number;
  dod: number;
  cycleLife: number;
  chargingTime: number;
  warranty: number;
  price: number;
  weight: number;
  dimensions: string;
  compatible: SystemType[];
  image?: string;
  highlight?: string;
}

export interface MountingStructure {
  id: string;
  type: 'Pre-Galvanized (Pre-GI)' | 'Hot Dip Galvanized (HDG)' | 'Aluminum Alloy' | 'Mild Steel Painted';
  roofType: 'RCC Flat' | 'Tin Sheet' | 'Ground Mount' | 'All';
  material: string;
  thickness: string;
  galvanizingCoating?: string;
  windSpeed: number;
  warranty: number;
  pricePerKw: number;
  highlight?: string;
}

export interface StateSubsidy {
  state: string;
  code: string;
  centralSubsidy: { upTo2kw: number; per2to3kw: number };
  stateSubsidy: { type: 'flat' | 'per_kw' | 'percentage'; amount: number; maxKw?: number; maxAmount?: number };
  discom: string;
  netMeteringAvailable: boolean;
  additionalInfo?: string;
}

export interface BosSelections {
  dcCableId: string | null;
  acCableId: string | null;
  dcdbId: string | null;
  acdbId: string | null;
  spdId: string | null;
  earthingId: string | null;
  mc4Id: string | null;
  netMeterKitId: string | null;
}

export interface SystemConfig {
  systemType: SystemType;
  capacityKw: number;
  state: string;
  monthlyBill: number;
  roofArea: number;
  panelId: string | null;
  inverterId: string | null;
  batteryId: string | null;
  batteryCount: number;
  mountingId: string | null;
  bos: BosSelections;
}

export interface PriceBreakdown {
  panels: { qty: number; unitCost: number; total: number };
  inverter: { qty: number; unitCost: number; total: number };
  batteries: { qty: number; unitCost: number; total: number };
  mounting: { total: number };
  bos: { total: number; breakdown: { label: string; cost: number }[] };
  installation: number;
  grossTotal: number;
  centralSubsidy: number;
  stateSubsidy: number;
  netTotal: number;
}
