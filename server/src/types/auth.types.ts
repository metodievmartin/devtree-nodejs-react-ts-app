import type { JwtPayload as JwtPayloadBase } from 'jsonwebtoken';

/**
 * Project-specific JWT payload type.
 * Extends the base JwtPayload from jsonwebtoken and ensures 'id' and 'email' are always present.
 */
export interface AppJwtPayload extends JwtPayloadBase {
  id: string;
  email: string;
}
