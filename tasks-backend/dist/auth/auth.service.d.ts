import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly users;
    constructor(jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
