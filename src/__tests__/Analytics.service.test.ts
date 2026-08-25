// src/__tests__/Analytics.service.test.ts
import { AnalyticsService } from "../services/Analytics.service";
import { Order } from "../models/Order.model";
import { ItemCategory } from "../models/Item.model";

describe("AnalyticsService", () => {
  // A helper that builds a fake repository returning the orders we give it.
  const makeMockRepo = (orders: Order[]) => {
    return {
      getAll: async () => orders,
    } as any;
  };

  // Some sample orders we'll reuse across tests.
  // Sample orders using plain-data items, matching what the database returns.
    const cakeOrder = new Order({ category: ItemCategory.CAKE } as any, 100, 2);
    const bookOrder = new Order({ category: ItemCategory.BOOK } as any, 20, 5);
    const toyOrder  = new Order({ category: ItemCategory.TOY } as any, 50, 1);;

  it("getTotalOrders returns the number of orders", async () => {
    const service = new AnalyticsService(makeMockRepo([cakeOrder, bookOrder, toyOrder]));

    const result = await service.getTotalOrders();

    expect(result).toBe(3);
  });

  it("getTotalOrders returns 0 when there are no orders", async () => {
    const service = new AnalyticsService(makeMockRepo([]));

    const result = await service.getTotalOrders();

    expect(result).toBe(0);
  });

  it("getOrderCountsByType counts orders per category", async () => {
    const service = new AnalyticsService(
      makeMockRepo([cakeOrder, bookOrder, toyOrder, cakeOrder])
    );

    const result = await service.getOrderCountsByType();

    expect(result).toEqual({ cake: 2, book: 1, toy: 1 });
  });

  it("getTotalRevenue sums price times quantity for all orders", async () => {
    const service = new AnalyticsService(
      makeMockRepo([cakeOrder, bookOrder, toyOrder])
    );

    const result = await service.getTotalRevenue();

    // cake: 100*2=200, book: 20*5=100, toy: 50*1=50  => 350
    expect(result).toBe(350);
  });

  it("getRevenueByType sums revenue per category", async () => {
    const service = new AnalyticsService(
      makeMockRepo([cakeOrder, bookOrder, toyOrder, cakeOrder])
    );

    const result = await service.getRevenueByType();

    // cake: 200+200=400, book: 100, toy: 50
    expect(result).toEqual({ cake: 400, book: 100, toy: 50 });
  });
});