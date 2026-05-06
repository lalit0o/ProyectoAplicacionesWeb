import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // registro
  async register(data: any) {
    const userExists = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new HttpException('El correo ya está en uso', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        password: hashedPassword,
        // El rol se pone automáticamente en 'cliente'
      },
    });

    return this.generateToken(newUser.id, newUser.email, newUser.rol);
  }

  // login
  async login(data: any) {
    // buscar al usuario por correo
    const user = await this.prisma.usuario.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }

    return this.generateToken(user.id, user.email, user.rol);
  }

  // funcion para crear el token
  private generateToken(id: number, email: string, rol: string) {
    const payload = { sub: id, email, rol };
    return {
      message: 'Operación exitosa',
      token: this.jwtService.sign(payload),
    };
  }
}