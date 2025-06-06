import Encoding from 'encoding-japanese';

import Point from '@entities/Point';
import Route from '@entities/Route';
import { routeAnimations } from '@utils/routeInfoData';

/**
 * Properly splits a CSV string while accounting for lists that are defined by putting quotes around multiple values. For instance:
 * `value1,"value2,value3",value4` will be split into `['value1', 'value2,value3', 'value4']`.
 * @param str the CSV row string to split
 * @returns an array of strings with every string being one column of the CSV row
 * @see csvArraySplit
 */
export const csvSplit = (str: string) => {
  let quoteActive = false;
  let currStr = '';
  const arr: string[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === '"' && i - 1 >= 0 && str.charAt(i - 1) !== '\\') {
      quoteActive = !quoteActive;
    }
    if (str.charAt(i) === ',' && !quoteActive) {
      arr.push(currStr);
      currStr = '';
    }
    if (![',', '"'].includes(str.charAt(i)) || (quoteActive && str.charAt(i) === ',')) {
      currStr += str.charAt(i);
    }
  }
  if (quoteActive) {
    throw new Error('The CSV file contains an odd number of quotes.');
  }
  return arr;
};

/**
 * Properly splits a list of values of a single CSV column defined in this format `"value1, value2, value3"`.
 * @param str the CSV list to split
 * @returns the CSV string as an array of values
 */
const csvArraySplit = (str: string) => {
  return str.includes(',') || str.length ? str.split(',') : [];
};

/**
 * Creates a list of points from a CSV string.
 * @param pointStr the CSV string to create points from
 * @returns the list of newly created points
 * @see csvArraySplit
 * @see csvSplit
 */
export const makePoints = (pointStr: string) => {
  const points: Point[] = [];

  pointStr
    .split(pointStr.includes('\r\n') ? '\r\n' : '\n')
    .filter((row) => row.length)
    .map((row) => {
      const pointArr = csvSplit(row);

      // ID will be unused here because it'll be easier to hardcode the IDs to be based on the list order.
      const [_id, name, flags, unlockedLevels, unlockedRoutes, unused, unlockedLevelsSE, unlockedRoutesSE] = pointArr;
      points.push(
        new Point({
          flags: csvArraySplit(flags),
          name,
          unlockedLevels: csvArraySplit(unlockedLevels),
          unlockedLevelsSE: csvArraySplit(unlockedLevelsSE),
          unlockedRoutes: csvArraySplit(unlockedRoutes),
          unlockedRoutesSE: csvArraySplit(unlockedRoutesSE),
          unused: csvArraySplit(unused)
        })
      );
    });

  return points;
};

/**
 * Creates a list of routes from a CSV string.
 * @param routeStr the CSV string to create routes from
 * @returns the list of newly created routes
 */
export const makeRoutes = (routeStr: string) => {
  const routes: Route[] = [];

  routeStr
    .split(routeStr.includes('\r\n') ? '\r\n' : '\n')
    .filter((row) => row.length)
    .map((row) => {
      const routeArr = csvSplit(row).filter((point) => point?.length);
      const [name, anim] = routeArr;

      routes.push(
        new Route({
          animation: routeAnimations[routeAnimations.map((anim) => anim.originalName).indexOf(anim)].name,
          name
        })
      );
    });
  return routes;
};

/**
 * Converts raw byte data to a Unicode string.
 * @param data the byte array to convert to a Unicode string
 * @returns the Unicode string
 */
export const toUnicode = (data: Uint8Array) => {
  return Encoding.codeToString(Encoding.convert(data, { to: 'UNICODE' }));
};

/**
 * Checks if a point name matches a predefined regex.
 * @param pointName the point name to verify
 * @param options a set of options defining how strictly or loosely a point name should be verified. If omitted, the level name will be matched against all available criteria.
 * @returns whether the point name is valid
 */
export const verifyPointName = (pointName: string, options?: PointVerificationOptions) => {
  if (pointName.length !== 4) {
    return false;
  }

  const levelRegex = /^W[1-9](?:S[0-1]|K[0-3]|[ACGTWX]0|0[1-9])$/;
  const flagRegex = /^F[0-9abcdkls][0-9ACGTWX]{2}$/;
  const passRegex = /^K[a0-9][0-9]{2}$/;

  return (
    ((!options || options.levelName) && levelRegex.test(pointName)) ||
    ((!options || options.flagBone) && flagRegex.test(pointName)) ||
    ((!options || options.kBone) && passRegex.test(pointName)) ||
    false
  );
};

export const objectEquals = <T>(first: T, second: T) => {
  let key: keyof T;
  for (key in first) {
    if (typeof first[key] === 'object') {
      if (!objectEquals(first[key], second[key])) {
        return false;
      }
      continue;
    }
    if (first[key] !== second[key]) {
      return false;
    }
  }
  return true;
};
