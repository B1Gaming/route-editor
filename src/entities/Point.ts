import type { PointVerificationOptions, Verifiable } from '@model/common';

import { verifyPointName } from '@utils/utils';

interface PointConstructorParam {
  flags?: string[];
  name?: string;
  unlockedLevels?: string[];
  unlockedLevelsSE?: string[];
  unlockedRoutes?: string[];
  unlockedRoutesSE?: string[];
  unused?: string[];
}

class Point implements Verifiable {
  flags;
  name;
  unlockedLevels;
  unlockedLevelsSE;
  unlockedRoutes;
  unlockedRoutesSE;
  unused;

  constructor(param?: PointConstructorParam) {
    this.name = param?.name ?? 'W000';
    this.flags = param?.flags ?? [];
    this.unlockedLevels = param?.unlockedLevels ?? [];
    this.unlockedRoutes = param?.unlockedRoutes ?? [];
    this.unused = param?.unused ?? [];
    this.unlockedLevelsSE = param?.unlockedLevelsSE ?? [];
    this.unlockedRoutesSE = param?.unlockedRoutesSE ?? [];
  }

  public equals = (another: Verifiable): boolean => {
    if (!(another instanceof Point)) {
      return false;
    }

    return (
      this.name === another.name &&
      this.arrayCompare(this.flags, another.flags) &&
      this.arrayCompare(this.unlockedLevels, another.unlockedLevels) &&
      this.arrayCompare(this.unlockedRoutes, another.unlockedRoutes) &&
      this.arrayCompare(this.unlockedLevelsSE, another.unlockedLevelsSE) &&
      this.arrayCompare(this.unlockedRoutesSE, another.unlockedRoutesSE)
    );
  };

  public isValid = () => {
    const options: PointVerificationOptions = {
      flagBone: true,
      levelName: true
    };

    return (
      verifyPointName(this.name, options) &&
      this.unlockedLevels.filter((ul) => !(ul.startsWith('W') || verifyPointName(ul, options))).length === 0 &&
      !this.unlockedLevels.includes(this.name) &&
      this.unlockedLevelsSE.filter((ulSe) => !(ulSe.startsWith('W') || verifyPointName(ulSe, options))).length === 0 &&
      !this.unlockedLevelsSE.includes(this.name) &&
      this.unlockedLevels.filter((level) => this.unlockedLevelsSE.includes(level)).length === 0
    );
  };

  /**
   * Returns this point's values as a valid CSV string.
   * @returns this point's values as a valid CSV string
   */
  public toCsvString = () => {
    const flagsString = this.flags.length > 1 ? `"${this.flags.join(',')}"` : this.flags.join('');
    const unlockedLevelsString =
      this.unlockedLevels.length > 1 ? `"${this.unlockedLevels.join(',')}"` : this.unlockedLevels.join('');
    const unlockedRoutesString =
      this.unlockedRoutes.length > 1 ? `"${this.unlockedRoutes.join(',')}"` : this.unlockedRoutes.join('');
    const unlockedLevelsSEString =
      this.unlockedLevelsSE.length > 1 ? `"${this.unlockedLevelsSE.join(',')}"` : this.unlockedLevelsSE.join('');
    const unlockedRoutesSEString =
      this.unlockedRoutesSE.length > 1 ? `"${this.unlockedRoutesSE.join(',')}"` : this.unlockedRoutesSE.join('');

    // Even though this does look like something is missing because of the duplicate comma, this is intentional. The empty column represents something
    // that went unused in the retail game anyway. It is speculated that that column is related to flags activated upon reaching the secret exit of a
    // level. For now, this column will remain blank
    return `${this.name},${flagsString},${unlockedLevelsString},${unlockedRoutesString},,${unlockedLevelsSEString},${unlockedRoutesSEString},\r\n`;
  };

  private arrayCompare = <T>(arr1: T[], arr2: T[]) => {
    return arr1.filter((val, i) => val !== arr2[i]).length === 0;
  };
}

export default Point;
