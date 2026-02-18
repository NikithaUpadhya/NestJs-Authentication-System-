import { registerAs } from "@nestjs/config";
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";

export default registerAs('refresh_jwt', () : JwtSignOptions=> ({
 secret: process.env.REFRESH_JWT_SECRET,
 expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
} as JwtSignOptions
));