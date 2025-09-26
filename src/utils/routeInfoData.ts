interface FlagDef {
  [k: string]: string;
}

/**
 * An object defining the three "translations" of a route animation in order to help with character encodings. Those three translations are:
 * - the translated English name
 * - the original Japanese name
 * - the raw bytes of the original Japanese name string
 */
interface RouteAnimation {
  name: string;
  originalName: string;
  rawBytes: Uint8Array;
}

const animCSV = `jump,ジャンプ,131_87_131_131_131_147_131_118
walkGrass,道,147_185
walkSand,砂,141_187
walkQuicksand,流砂,151_172_141_187
walkSnow,雪,140_225
walkIce,氷,145_88
walkWood,木,146_216
walkDirt,土,147_121
snowSlope,坂,141_226
iceSlope,氷坂,145_88_141_226
ladderUp,はしご,130_205_130_181_130_178
rockLadderUp,はしご岩,130_205_130_181_130_178_138_226
ropeLadderUp,はしご縄,130_205_130_181_130_178_147_234
ladderLeft,はしご左,130_205_130_181_130_178_141_182
ladderRight,はしご右,130_205_130_181_130_178_137_69
beanstalk,ツタ,131_99_131_94`.split('\n');

/**
 * A list of all available route animations in New Super Mario Bros. Wii.
 * @see RouteAnimation
 */
export const routeAnimations: RouteAnimation[] = animCSV.map((anim) => {
  const [name, originalName, rawBytes] = anim.split(',');
  return {
    name,
    originalName,
    rawBytes: new Uint8Array(rawBytes.split('_').map((byte) => parseInt(byte))),
  };
});

/**
 * A list of all available flags New Super Mario Bros. Wii has.
 */
export const allFlags: FlagDef = {
  anchor: 'Anchor? (unused)',
  board: 'Has star board',
  camstop: 'Stop camera movement',
  crossroad: 'Stop (> 3 paths)',
  demo1: 'Koopaling jump 1',
  demo2: 'Koopaling jump 2',
  demo3: 'Koopaling jump 3',
  demo4: 'Koopaling jump 4',
  demo5: 'Koopaling jump 5',
  demo6: 'Koopaling jump 6',
  demo7: 'Koopaling jump 7',
  demostop: '8-Airship cutscene related',
  dokan: 'Pipe',
  focus: 'Focus on the player',
  ice: 'Ice landing particles (unused)',
  link1: 'Links to subworld',
  link2: 'Links to subworld (2) (unused)',
  link3: 'Links to subworld (3) (unused)',
  link4: 'Links to subworld (4) (unused)',
  link5: 'Links to subworld (5) (unused)',
  noshift: 'No camera shift',
  sand: 'Sand landing particles',
  scale: 'Scale down player',
  scroll: 'Free scrolling',
  scrollA: 'Scrolling on the X axis',
  scrollY: 'Scrolling on Y axis',
  stop: 'Stops player',
  switch: 'Red Switch',
  tilt: 'Tilts camera',
  ura: 'Secret Exit related',
};
