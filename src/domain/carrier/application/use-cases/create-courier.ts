import { CouriersRepository } from '../repositories/courier-repository'
import { Courier } from '../../enterprise/entities/courier'

interface CreateCourierUseCaseRequest {
  name: string
  cpf: string
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
  }: CreateCourierUseCaseRequest): Promise<CreateCourierUseCaseResponse> {
    const courier = Courier.create({
      name,
      cpf,
    })

    await this.couriersRepository.create(courier)

    return { courier }
  }
}
