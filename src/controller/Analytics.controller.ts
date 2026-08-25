// src/controller/Analytics.controller.ts
import { Request, Response } from "express";
import { AnalyticsService } from "../services/Analytics.service";

export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // 1. Total order count
  public async getTotalOrders(req: Request, res: Response): Promise<void> {
    const totalOrders = await this.analyticsService.getTotalOrders();
    res.status(200).json({ totalOrders });
  }

  // 2. Order counts by item type
  public async getOrderCountsByType(req: Request, res: Response): Promise<void> {
    const countsByType = await this.analyticsService.getOrderCountsByType();
    res.status(200).json({ countsByType });
  }

  // 3. Total revenue
  public async getTotalRevenue(req: Request, res: Response): Promise<void> {
    const totalRevenue = await this.analyticsService.getTotalRevenue();
    res.status(200).json({ totalRevenue, currency: "USD" });
  }

  // 4. Revenue breakdown by item type
  public async getRevenueByType(req: Request, res: Response): Promise<void> {
    const revenueByType = await this.analyticsService.getRevenueByType();
    res.status(200).json({ currency: "USD", revenueByType });
  }
}