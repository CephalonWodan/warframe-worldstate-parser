import { createHash } from 'node:crypto';
import WorldstateObject from './WorldstateObject';

/**
 * Represents enemy construction progress
 * @augments {WorldstateObject}
 */
export default class ConstructionProgress extends WorldstateObject {
  fomorianProgress: string;
  razorbackProgress: string;
  unknownProgress: string;

  /**
   * @param data The construction data
   */
  constructor(data: number[] = [0, 0, 0]) {
    // Patch: always ensure data is a 3-element array of numbers, fallback to [0,0,0]
    const safeData = Array.isArray(data) && data.length >= 3
      ? data
      : [0, 0, 0];
    super({
      _id: {
        $oid: createHash('md5').update(JSON.stringify(safeData), 'utf8').digest('hex'),
      },
    });

    this.fomorianProgress = (safeData[0] ?? 0.0).toFixed(2);
    this.razorbackProgress = (safeData[1] ?? 0.0).toFixed(2);
    this.unknownProgress = (safeData[2] ?? 0.0).toFixed(2);
  }
}
