import { Courier } from '../../enterprise/entities/courier'

export interface CouriersRepository {
  findByCpf(cpf: string): Promise<Courier | null>
  create(courier: Courier): Promise<void>
}
