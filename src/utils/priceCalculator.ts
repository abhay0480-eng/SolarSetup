import type {
  SystemConfig, PriceBreakdown, SolarPanel, Inverter,
  Battery, MountingStructure, StateSubsidy,
} from '../types/solar';
import { bosComponents } from '../data/bos';

export function calculatePanelCount(capacityKw: number, panel: SolarPanel): number {
  return Math.ceil((capacityKw * 1000) / panel.wattage);
}

export function calculateSubsidy(
  capacityKw: number,
  subsidy: StateSubsidy,
): { central: number; state: number } {
  const capped = Math.min(capacityKw, 10);

  let central = 0;
  if (capped <= 2) {
    central = capped * subsidy.centralSubsidy.upTo2kw;
  } else {
    central = 2 * subsidy.centralSubsidy.upTo2kw;
    central += Math.min(capped - 2, 1) * subsidy.centralSubsidy.per2to3kw;
  }

  let state = 0;
  const s = subsidy.stateSubsidy;
  if (s.type === 'flat') {
    state = s.amount;
  } else if (s.type === 'per_kw') {
    const kwS = s.maxKw ? Math.min(capped, s.maxKw) : capped;
    state = kwS * s.amount;
    if (s.maxAmount) state = Math.min(state, s.maxAmount);
  }
  // percentage is applied against grossTotal later

  return { central: Math.round(central), state };
}

// DC cable metres needed for a given panel count (both +ve and -ve conductors)
export function dcCableMetres(panelCount: number): number {
  return Math.ceil(panelCount * 4 * 1.25); // 4m avg per panel × 25% overhead, both conductors
}

// AC cable metres for inverter to ACDB run
export const AC_CABLE_METRES = 12;

function calcBosTotal(config: SystemConfig, panelCount: number) {
  const items: { label: string; cost: number }[] = [];

  const pick = (id: string | null) =>
    id ? bosComponents.find(b => b.id === id) ?? null : null;

  const dcCable = pick(config.bos.dcCableId);
  if (dcCable) {
    const metres = dcCableMetres(panelCount);
    items.push({ label: `DC Cable (${metres}m)`, cost: Math.round(dcCable.pricePerUnit * metres) });
  }

  const acCable = pick(config.bos.acCableId);
  if (acCable) {
    items.push({ label: `AC Cable (${AC_CABLE_METRES}m)`, cost: Math.round(acCable.pricePerUnit * AC_CABLE_METRES) });
  }

  const dcdb = pick(config.bos.dcdbId);
  if (dcdb) items.push({ label: 'DCDB', cost: dcdb.pricePerUnit });

  const acdb = pick(config.bos.acdbId);
  if (acdb) items.push({ label: 'ACDB', cost: acdb.pricePerUnit });

  const spd = pick(config.bos.spdId);
  if (spd) items.push({ label: 'SPD Set (DC + AC)', cost: spd.pricePerUnit });

  const earthing = pick(config.bos.earthingId);
  if (earthing) items.push({ label: 'Earthing System', cost: earthing.pricePerUnit });

  const mc4 = pick(config.bos.mc4Id);
  if (mc4) items.push({ label: 'MC4 Connectors', cost: mc4.pricePerUnit });

  const netMeter = pick(config.bos.netMeterKitId);
  if (netMeter) items.push({ label: 'Net Meter Kit', cost: netMeter.pricePerUnit });

  const total = items.reduce((s, i) => s + i.cost, 0);
  return { total, breakdown: items };
}

export function calculatePrice(
  config: SystemConfig,
  panel: SolarPanel | null,
  inverter: Inverter | null,
  battery: Battery | null,
  mounting: MountingStructure | null,
  subsidy: StateSubsidy | null,
): PriceBreakdown {
  const panelCount = panel ? calculatePanelCount(config.capacityKw, panel) : 0;
  const panelTotal = panel ? panelCount * panel.wattage * panel.pricePerWatt : 0;

  const inverterTotal = inverter ? inverter.price : 0;
  const batteryTotal = battery ? battery.price * config.batteryCount : 0;
  const mountingTotal = mounting ? mounting.pricePerKw * config.capacityKw : 0;

  const bos = calcBosTotal(config, panelCount);

  const subtotal = panelTotal + inverterTotal + batteryTotal + mountingTotal + bos.total;
  const installation = Math.round(subtotal * 0.07); // 7% installation
  const grossTotal = subtotal + installation;

  let centralSubsidy = 0;
  let stateSubsidy = 0;

  if (subsidy) {
    const s = calculateSubsidy(config.capacityKw, subsidy);
    centralSubsidy = s.central;

    if (subsidy.stateSubsidy.type === 'percentage') {
      let pct = (grossTotal * subsidy.stateSubsidy.amount) / 100;
      if (subsidy.stateSubsidy.maxAmount) pct = Math.min(pct, subsidy.stateSubsidy.maxAmount);
      stateSubsidy = Math.round(pct);
    } else {
      stateSubsidy = s.state;
    }
  }

  const netTotal = Math.max(0, grossTotal - centralSubsidy - stateSubsidy);

  return {
    panels: { qty: panelCount, unitCost: panel ? panel.wattage * panel.pricePerWatt : 0, total: panelTotal },
    inverter: { qty: 1, unitCost: inverterTotal, total: inverterTotal },
    batteries: { qty: config.batteryCount, unitCost: battery?.price ?? 0, total: batteryTotal },
    mounting: { total: mountingTotal },
    bos,
    installation,
    grossTotal,
    centralSubsidy,
    stateSubsidy,
    netTotal,
  };
}

export function estimateCapacityFromBill(monthlyBill: number): number {
  const unitsPerMonth = monthlyBill / 8;
  const kw = unitsPerMonth / (5 * 30);
  if (kw < 1) return 1;
  if (kw > 10) return 10;
  return Math.ceil(kw * 2) / 2;
}

export function formatINR(amount: number): string {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function estimateBatteryCount(capacityKw: number, battery: Battery | null): number {
  if (!battery) return 1;

  // Lithium packs (48V / 51.2V) are sold as complete self-contained units.
  // One 5kWh pack is the standard pairing for a 3–10kW inverter.
  if (battery.type.includes('Lithium')) return 1;

  // Lead-acid 12V batteries must be wired in series to reach the inverter DC bus voltage.
  const busVoltage = capacityKw >= 3 ? 48 : 24;
  return busVoltage / battery.voltage;
}

export function roiYears(netTotal: number, monthlyBill: number): number {
  const annualSavings = monthlyBill * 12 * 0.85;
  if (annualSavings <= 0) return 0;
  return Math.round(netTotal / annualSavings);
}

// Return sensible BOS defaults for a new config
export function defaultBosSelections(systemType: string) {
  return {
    dcCableId: 'dc-cable-polycab-4mm',
    acCableId: 'ac-cable-polycab-4c-4mm',
    dcdbId: 'dcdb-eastman-4str',
    acdbId: 'acdb-lt-mcb-single',
    spdId: 'spd-obo-dc-ac',
    earthingId: 'earthing-copper-bonded',
    mc4Id: 'mc4-compatible',
    netMeterKitId: systemType !== 'off-grid' ? 'net-meter-secure' : null,
  };
}
