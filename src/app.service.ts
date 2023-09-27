import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Get dashboard data
   */
  async getDashboard(): Promise<object> {
    const top_five_employers = await this.prismaService.employer.findMany({
      orderBy: {
        point_rating: 'desc',
      },
      take: 5,
    });

    const bottom_five_employers = await this.prismaService.employer.findMany({
      orderBy: {
        point_rating: 'asc',
      },
      take: 5,
    });

    return {
      top: top_five_employers,
      bottom: bottom_five_employers,
    };
  }
}
