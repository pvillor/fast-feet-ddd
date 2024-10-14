import { CouriersRepository } from '../repositories/courier-repository'

interface EditCourierUseCaseRequest {
  courierId: string
  name: string
  cpf: string
}

interface EditCourierUseCaseResponse {
  //
}

export class EditCourierUseCase {
  constructor(private couriersRepository: CouriersRepository) {
    //
  }

  async execute({
    courierId,
    name,
    cpf,
  }: EditCourierUseCaseRequest): Promise<EditCourierUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    const courierWithSameCpf = await this.couriersRepository.findByCpf(cpf)

    if (courierWithSameCpf) {
      throw new Error('CPF already in use')
    }

    courier.name = name
    courier.cpf = cpf

    await this.couriersRepository.save(courier)

    return {}
  }
}
