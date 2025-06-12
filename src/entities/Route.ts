import type { Verifiable } from '@model/common';

import { routeAnimations } from '@utils/routeInfoData';
import { verifyPointName } from '@utils/utils';

interface RouteConstructorParams {
  animation: string;
  name: string;
}

class Route implements Verifiable {
  public animation;
  public name;

  constructor(param?: RouteConstructorParams) {
    this.name = param?.name ?? 'RW000W000';
    this.animation = param?.animation ?? routeAnimations[1].name;
  }

  public equals = (another: Verifiable): boolean => {
    if (!(another instanceof Route)) {
      return false;
    }

    return this.name === another.name && this.animation === another.animation;
  };

  public isValid = () => {
    return (
      this.name.length === 9 &&
      this.name.charAt(0) === 'R' &&
      verifyPointName(this.name.substring(1, 5)) &&
      verifyPointName(this.name.substring(5))
    );
  };

  /**
   * Converts this route to its raw byte representation.
   * @returns the route in its raw byte representation
   */
  public toNumberArray = () => {
    const arr: number[] = [];
    for (let i = 0; i < this.name.length; i++) {
      arr.push(this.name.charCodeAt(i));
    }
    arr.push(','.charCodeAt(0));

    const animBytes = routeAnimations[routeAnimations.map((anim) => anim.name).indexOf(this.animation)].rawBytes;

    for (let i = 0; i < animBytes.length; i++) {
      arr.push(animBytes[i]);
    }

    arr.push(','.charCodeAt(0));
    arr.push(13, 10);

    return arr;
  };
}

export default Route;
