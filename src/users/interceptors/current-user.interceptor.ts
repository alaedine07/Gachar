import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
} from "@nestjs/common";
import {
    UsersService
} from '../users.service'
import { Observable } from "rxjs";

@Injectable()
export class currentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId;

        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }
}
