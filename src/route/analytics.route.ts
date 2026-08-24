// src/route/analytics.route.ts
import { Router } from "express";
import { AnalyticsController } from "../controller/Analytics.controller";
import { AnalyticsService } from "../services/Analytics.service";
import { OrderRepository } from "../repository/Order.repository";
import { asyncHandler } from "../middleware/asyncHandler";

// Build the chain: repository → service → controller (dependency injection)
const orderRepository = new OrderRepository();
const analyticsService = new AnalyticsService(orderRepository);
const analyticsController = new AnalyticsController(analyticsService);

const route = Router();

route
  .route("/orders/count")
  .get(asyncHandler(analyticsController.getTotalOrders.bind(analyticsController)));

route
  .route("/orders/count-by-type")
  .get(asyncHandler(analyticsController.getOrderCountsByType.bind(analyticsController)));

route
  .route("/revenue")
  .get(asyncHandler(analyticsController.getTotalRevenue.bind(analyticsController)));

route
  .route("/revenue/by-type")
  .get(asyncHandler(analyticsController.getRevenueByType.bind(analyticsController)));

export default route;