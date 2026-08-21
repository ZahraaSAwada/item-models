// src/service/Analytics.service.ts
import { OrderRepository } from "../repository/Order.repository";
import { Order } from "../models/Order.model";
import { ItemCategory } from "../models/Item.model";

export class AnalyticsService {
  private orderRepository: OrderRepository;

  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }

  // 1. Total number of orders
  async getTotalOrders(): Promise<number> {
    const orders = await this.orderRepository.getAll();
    return orders.length;
  }

  // 2. Order counts grouped by item type
  async getOrderCountsByType(): Promise<Record<ItemCategory, number>> {
    const orders = await this.orderRepository.getAll();

    const counts: Record<ItemCategory, number> = {
      [ItemCategory.CAKE]: 0,
      [ItemCategory.BOOK]: 0,
      [ItemCategory.TOY]: 0,
    };

    for (const order of orders) {
      const category = order.getItem().getCategory();
      counts[category] += 1;
    }

    return counts;
  }

  // 3. Total revenue across all orders
  async getTotalRevenue(): Promise<number> {
    const orders = await this.orderRepository.getAll();

    let total = 0;
    for (const order of orders) {
      total += order.getPrice() * order.getQuantity();
    }

    return total;
  }

  // 4. Revenue breakdown by item type
  async getRevenueByType(): Promise<Record<ItemCategory, number>> {
    const orders = await this.orderRepository.getAll();

    const revenue: Record<ItemCategory, number> = {
      [ItemCategory.CAKE]: 0,
      [ItemCategory.BOOK]: 0,
      [ItemCategory.TOY]: 0,
    };

    for (const order of orders) {
      const category = order.getItem().getCategory();
      revenue[category] += order.getPrice() * order.getQuantity();
    }

    return revenue;
  }
}