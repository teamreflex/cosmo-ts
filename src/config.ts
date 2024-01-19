export type Config = {
  /**
   * Makes it possible to switch environments.
   */
  baseUrl?: string;

  /**
   * Some endpoints are public, but it's recommended to provide a token.
   */
  accessToken?: string;
};
