import { CouriersRepository } from '../repositories/courier-repository'
import { Courier } from '../../enterprise/entities/courier'

interface GetCourierByCpfUseCaseRequest {
  cpf: string
}

interface GetCourierByCpfUseCaseResponse {
  courier: Courier
}

export class GetCourierByCpfUseCase {
  constructor(private couriersRepository: CouriersRepository) {
    //
  }

  async execute({
    cpf,
  }: GetCourierByCpfUseCaseRequest): Promise<GetCourierByCpfUseCaseResponse> {
    const courier = await this.couriersRepository.findByCpf(cpf)

    if (!courier) {
      throw new Error('Courier not found')
    }

    return { courier }
  }
}
