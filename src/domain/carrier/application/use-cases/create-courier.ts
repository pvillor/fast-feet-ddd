import { CouriersRepository } from '../repositories/courier-repository'
import { Courier } from '../../enterprise/entities/courier'
import { hash } from 'bcrypt'

interface CreateCourierUseCaseRequest {
  name: string
  cpf: string
  password: string
}

interface CreateCourierUseCaseResponse {
  courier: Courier
}

export class CreateCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {
    //
  }

  async execute({
    name,
    cpf,
    password,
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courierWithSameCpf = await this.couriersRepository.findByCpf(cpf)

    if (courierWithSameCpf) {
      throw new Error('CPF already in use')
    }

    const courier = await Courier.create({
      name,
      cpf,
      passwordHash: await hash(password, 6),
    })

    await this.couriersRepository.create(courier)

    return { courier }
  }
}
