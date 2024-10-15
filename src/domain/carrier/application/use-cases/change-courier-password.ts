import { Courier } from '../../enterprise/entities/courier'
import { CouriersRepository } from '../repositories/courier-repository'

interface ChangeCourierPasswordUseCaseRequest {
  courierId: string
  password: string
}

interface ChangeCourierPasswordUseCaseResponse {
  courier: Courier
}

export class ChangeCourierPasswordUseCase {
  constructor(private couriersRepository: CouriersRepository) {
    //
  }

  async execute({
    courierId,
    password,
  }: ChangeCourierPasswordUseCaseRequest): Promise<ChangeCourierPasswordUseCaseResponse> {
    const courier = await this.couriersRepository.findById(courierId)

    if (!courier) {
      throw new Error('Courier not found')
    }

    await courier.setPasswordHash(password)

    await this.couriersRepository.save(courier)

    return {
      courier,
    }
  }
}
