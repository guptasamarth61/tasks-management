import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { userId: 1, username: 'samarth', password: 'Qwerty@123' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(u => u.username === username && u.password === pass);
    if (user) {
      return { userId: user.userId, username: user.username };
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
    const payload = { username: user.username, sub: user.userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    return {
      access_token: accessToken,
    };
  }
}