// import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
// import * as jsonwebtoken from "jsonwebtoken";

// export class AuthMiddleware implements NestMiddleware {
//     use(req: any, res: any, next: (error?: any) => void) {
//         try {
//             const token = getTokenFromRequestHeader(req);
//             const data = jsonwebtoken.decode(token);
//             console.log(data);
//             jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
//             next();
//         } catch(e) {
//             next(new UnauthorizedException());
//         }
//     }
// }

