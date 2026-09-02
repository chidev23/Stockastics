export type ReligiousMode = 'halal' | 'haram';
export type StockClassification = ReligiousMode | 'unclassified';

/**
 * Every stock record coming from a production API should carry its screening
 * classification. General mode accepts every record. Religious modes accept
 * only records explicitly classified for that mode; unclassified records are
 * never allowed into Halal/Haram feeds.
 */
export type ScopedStock = {
  ticker: string;
  religious?: StockClassification;
  [key: string]: unknown;
};

export type ScopedContent = {
  religious?: StockClassification;
  [key: string]: unknown;
};

export function resolveReligiousMode(value: unknown): ReligiousMode | undefined {
  return value === 'halal' || value === 'haram' ? value : undefined;
}

export function belongsToReligiousMode(
  item: { religious?: StockClassification | null },
  mode?: ReligiousMode,
): boolean {
  if (!mode) return true;
  return item.religious === mode;
}

export function scopeByReligiousMode<T extends { religious?: StockClassification | null }>(
  items: readonly T[],
  mode?: ReligiousMode,
): T[] {
  return items.filter((item) => belongsToReligiousMode(item, mode));
}

export function modeLabel(mode?: ReligiousMode): string | undefined {
  return mode ? mode[0].toUpperCase() + mode.slice(1) : undefined;
}

export function modeColor(mode?: ReligiousMode): string {
  return mode === 'haram' ? '#DC2626' : '#16A34A';
}

/**
 * Navigation keeps the screening scope explicit. Production API calls should
 * use this same scope value when requesting stock/news/signal data so a
 * religious feed never falls back to the general stock feed.
 */
export function scopeParams(mode?: ReligiousMode): Record<string, string> {
  return mode ? { religious: mode } : {};
}
