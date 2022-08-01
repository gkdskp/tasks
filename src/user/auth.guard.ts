import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import * as jsonwebtoken from "jsonwebtoken";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const ctx = GqlExecutionContext.create(context);
            const req = ctx.getContext().req;

            const token = this.getTokenFromRequestHeader(req);
            const data = jsonwebtoken.decode(token);

            req.userRole = data['role'];
            req.user = data['id'];
            

            jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getTokenFromRequestHeader(req: any): string {
        const tokenWithBearerHeader = req.header(
            `Authorization`
        );

        if (tokenWithBearerHeader) {
            return tokenWithBearerHeader.replace(`Bearer `, "");
        }

        return "";
    };
}