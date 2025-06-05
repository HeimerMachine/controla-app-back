import { Finance } from "@entities/Finance";
import { FinanceRepository } from "@repositories/FinanceRepository";

export class GetAllFinancesByUserService {
  constructor(private readonly financeRepository: FinanceRepository) {}

  async execute(userEmail: string): Promise<Finance[]> {
    const finances = await this.financeRepository.getAllByUser(userEmail);
    return finances;
  }
}