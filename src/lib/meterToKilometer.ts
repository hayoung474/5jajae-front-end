export function meterToKilometer(meters: number) {
    const roundedMeters = Math.round(meters);
    if (meters < 1000) {
      return `${roundedMeters}m`;
    }
    return `${(roundedMeters * 0.001).toFixed(1)}km`;
  }
  