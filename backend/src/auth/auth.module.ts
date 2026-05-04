import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Esta es la config de como el servidor creara los Tokens para los usuarios que inicien sesion.
    JwtModule.register({
      global: true,
      secret: 'secretito123', // Es la firma invisible de nuestro servidor, con esa palabra clave blindamos el token para q no lo hackeen, en produccion se pone en el .env
      signOptions: { expiresIn: '1d' }, // la duracion del token, en este caso despues de 1 dia el usuario tiene q iniciar sesion otra vez
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}