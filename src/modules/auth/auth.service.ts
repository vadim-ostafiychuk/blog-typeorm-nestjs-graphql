import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDataInterface } from './interfaces/register-data.interface';
import { AuthError } from './errors/auth.error';
import { AuthResponseEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(email: string, password: string) {
    return this.validateUser(
      await this.usersService.findOneBy({ email }),
      password,
    );
  }

  public async validateUser(
    user: UserEntity,
    password: string,
  ): Promise<AuthResponseEntity> {
    if (!user) {
      throw AuthError.WrongLoginOrPassword();
    }

    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordsMatch) {
      throw AuthError.WrongLoginOrPassword();
    }

    const jwt = this.jwtService.sign({
      id: user.id,
    });

    return {
      jwt,
      user,
    };
  }

  public async register(
    data: RegisterDataInterface,
  ): Promise<AuthResponseEntity> {
    const foundedUser = await this.usersService.findOneBy({
      email: data.email,
    });

    if (foundedUser) {
      throw AuthError.AlreadyExists();
    }

    const hashedPassword: string = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser({
      email: data.email,
      hashedPassword: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    const jwtCode = this.jwtService.sign({
      id: user.id,
    });

    return {
      jwt: jwtCode,
      user,
    };
  }

  public async getUserByToken(accessToken: string): Promise<UserEntity> {
    try {
      const { id } = this.jwtService.verify(accessToken);

      return this.usersService.findOneBy({ id: id });
    } catch (error) {
      return null;
    }
  }
}
