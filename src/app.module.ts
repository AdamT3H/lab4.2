import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserService } from './service/user.service';
import { LinkService } from './service/link.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Users, LinkSchema, Links } from './schema';
import { LinksController } from './controllers/links.controller';
import {ShortLinkController} from './controllers/shortLink.controller'
import { UserApiKeyMiddleware } from './midellware/userAuthorization.middleware';
// import { OrdersController } from './controllers/orders.controller';
// import { OrderService } from './service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://UserAdam:Ogorodnik2006@cluster0.imsyknu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { dbName: 'Lab4' },
    ),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Links.name,
        schema: LinkSchema,
      }
    ]),
  ],
  controllers: [UsersController, LinksController, ShortLinkController],
  providers: [UserService, LinkService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserApiKeyMiddleware).forRoutes('/links');
  }
}
