import { CouriersRepository } from '@/domain/carrier/application/repositories/courier-repository'
import { Courier } from '@/domain/carrier/enterprise/entities/courier'

export class InMemoryCouriersRepository implements CouriersRepository {
  public items: Courier[] = []

  async findByCpf(cpf: string) {
    const courier = this.items.find((item) => item.cpf === cpf)

    if (!courier) {
      return null
    }

    return courier
  }

  async create(courier: Courier) {
    this.items.push(courier)
  }
}
