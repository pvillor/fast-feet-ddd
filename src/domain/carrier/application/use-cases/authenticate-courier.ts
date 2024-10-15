import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/courier-repository'
import { compare } from 'bcrypt'

interface AuthenticateCourierUseCaseRequest {
  cpf: string
  password: string
}

interface AuthenticateCourierUseCaseResponse {
  courier: Courier
}

export class AuthenticateCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {
    //
  }

  async execute({
    cpf,
    password,
  }: AuthenticateCourierUseCaseRequest): Promise<AuthenticateCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findByCpf(cpf)

    if (!courier) {
      throw new Error('Invalid credentials')
    }

    const doesPasswordMatch = await compare(password, courier.passwordHash)

    if (!doesPasswordMatch) {
      throw new Error('Invalid credentials')
    }

    return { courier }
  }
}
