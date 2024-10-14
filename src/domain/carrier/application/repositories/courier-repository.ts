import { Courier } from '../../enterprise/entities/courier'

export interface CouriersRepository {
  findById(id: string): Promise<Courier | null>
  findByCpf(cpf: string): Promise<Courier | null>
  create(courier: Courier): Promise<void>
}
