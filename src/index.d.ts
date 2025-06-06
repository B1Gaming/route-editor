/// <reference types="react" />

type ColorType = 'error' | 'primary' | 'secondary' | 'success' | 'warn';

interface GenericProviderProps {
  children: ReactNode;
}

type Pages = 'home' | 'point' | 'route';

interface PointVerificationOptions {
  flagBone?: boolean;
  kBone?: boolean;
  levelName?: boolean;
}

interface SelectOption {
  label: string;
  value: string;
}

interface Settings {
  darkMode: boolean;
}

interface SnackbarData {
  color?: ColorType;
  message: string;
}

/**
 * An interface with methods for classes that need to be validated in order to be used properly.
 */
interface Verifiable {
  /**
   * Compares this object to another `Verifiable` object.
   * @param another the other `Verifiable` object to compare this object to.
   * @returns whether the objects are equal.
   */
  equals: (another: Verifiable) => boolean;
  /**
   * Validates the object.
   * @returns if the object is valid
   */
  isValid: () => boolean;

  name: string;
}
