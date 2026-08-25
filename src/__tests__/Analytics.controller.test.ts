// src/__tests__/Analytics.controller.test.ts
import { AnalyticsController } from "../controller/Analytics.controller";
import { AnalyticsService } from "../services/Analytics.service";
import { Request, Response } from "express";
import { ItemCategory } from "../models/Item.model";

describe("AnalyticsController", () => {
  // Build a fake response object whose status() and json() we can watch.
  const makeMockRes = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res); // returns res so .status().json() chains
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  // req is unused by our endpoints, so an empty object is enough.
  const mockReq = {} as Request;

  // ---------- SUCCESS CASES ----------

  it("getTotalOrders responds 200 with the total", async () => {
    const mockService = {
      getTotalOrders: jest.fn().mockResolvedValue(42),
    } as unknown as AnalyticsService;

    const controller = new AnalyticsController(mockService);
    const res = makeMockRes();

    await controller.getTotalOrders(mockReq, res);

    expect(mockService.getTotalOrders).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ totalOrders: 42 });
  });

  it("getOrderCountsByType responds 200 with the counts", async () => {
    const counts = {
      [ItemCategory.CAKE]: 5,
      [ItemCategory.BOOK]: 2,
      [ItemCategory.TOY]: 1,
    };
    const mockService = {
      getOrderCountsByType: jest.fn().mockResolvedValue(counts),
    } as unknown as AnalyticsService;

    const controller = new AnalyticsController(mockService);
    const res = makeMockRes();

    await controller.getOrderCountsByType(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ countsByType: counts });
  });

  it("getTotalRevenue responds 200 with revenue and currency", async () => {
    const mockService = {
      getTotalRevenue: jest.fn().mockResolvedValue(1000),
    } as unknown as AnalyticsService;

    const controller = new AnalyticsController(mockService);
    const res = makeMockRes();

    await controller.getTotalRevenue(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ totalRevenue: 1000, currency: "USD" });
  });

  it("getRevenueByType responds 200 with revenue breakdown", async () => {
    const revenue = {
      [ItemCategory.CAKE]: 500,
      [ItemCategory.BOOK]: 300,
      [ItemCategory.TOY]: 200,
    };
    const mockService = {
      getRevenueByType: jest.fn().mockResolvedValue(revenue),
    } as unknown as AnalyticsService;

    const controller = new AnalyticsController(mockService);
    const res = makeMockRes();

    await controller.getRevenueByType(mockReq, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ currency: "USD", revenueByType: revenue });
  });

  // ---------- ERROR CASE ----------

  it("propagates the error when the service fails", async () => {
    const mockService = {
      getTotalOrders: jest.fn().mockRejectedValue(new Error("DB down")),
    } as unknown as AnalyticsService;

    const controller = new AnalyticsController(mockService);
    const res = makeMockRes();

    await expect(controller.getTotalOrders(mockReq, res)).rejects.toThrow("DB down");
    expect(res.json).not.toHaveBeenCalled();
  });
});