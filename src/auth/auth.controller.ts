import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SignInDto } from './dto/signin-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  /* This is for sign up */
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: SignInDto })
  signinUser(@Request() req) {
    return this.authService.login(req.user.id, req.user.name);
  }

  @Roles('ADMIN', 'USER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get("protected")
  getAll(@Request() req) {
    return `Now you can access this protected API. This is user with id ${req.user.id}`;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  refreshToken(@Request() req){
    return this.authService.refreshToken(req.user.id, req.user.name);
  }


  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  googleLogin(){}


  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  googleCallback(@Request() req){
    console.log('Google User', req.user)

  }





}
