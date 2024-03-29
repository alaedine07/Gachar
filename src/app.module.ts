import {
    MiddlewareConsumer,
    Module,
    ValidationPipe
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
const cookieSession = require('cookie-session');

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [User, Report],
            synchronize: true
        }),
        UsersModule,
        ReportsModule,
        TypeOrmModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true
            }),
        }
    ],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cookieSession({
            keys: ['allela123allela']
        })).forRoutes('*');
    }
}
