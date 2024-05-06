import { Router } from "express";
import { rolePermissions } from "../globals";
import { middleware } from "../middleware";
import {
  getAllStsService,
  createStsService,
  vehiclesInStsService,
  vehicleEnteredInStsService,
  vehiclesThatLeftStsService,
  vehicleLeavingStsService,
  fleetOptimizationService,
  getStsService,
} from "../services/StsService";
import getErrorType from "../error";

const stsRouter = Router();

stsRouter.get(
  "/sts",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  async (req, res) => {
    try {
      const sts = await getAllStsService(
        res.locals.permission,
        parseInt(res.locals.userId)
      );
      return res.json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.post(
  "/sts",
  middleware([rolePermissions.CREATE_STS]),
  async (req, res) => {
    let { ward, capacity, latitude, longitude, landfill_id } = req.body;
    try {
      const sts = await createStsService({
        ward,
        capacity,
        latitude,
        longitude,
        landfill_id,
      });
      return res.status(201).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.get(
  "/sts/vehicle",
  middleware([rolePermissions.READ_VEHICLE_SELF]),
  async (req, res) => {
    try {
      const sts = await vehiclesInStsService(parseInt(res.locals.userId));
      return res.status(200).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.post(
  "/sts/vehicle",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const { sts_id, vehicle_number, waste_volume } = req.body;
      const message = await vehicleEnteredInStsService(
        parseInt(sts_id),
        vehicle_number,
        parseFloat(waste_volume)
      );
      return res.status(200).json(message);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);
stsRouter.get(
  "/sts/left",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_VEHICLE_ALL,
  ]),
  async (req, res) => {
    try {
      const vehicleLeftSts = await vehiclesThatLeftStsService(
        res.locals.userId,
        res.locals.permission
      );
      return res.status(200).json(vehicleLeftSts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.put(
  "/sts/vehicle/:sts_vehicle_id",
  middleware([rolePermissions.STS_VEHICLE_UPDATE]),
  async (req, res) => {
    try {
      const sts_vehicle_id = +req.params.sts_vehicle_id;
      const vehicle = await vehicleLeavingStsService(
        res.locals.userId,
        sts_vehicle_id
      );
      return res.status(200).json(vehicle);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.get(
  "/sts/:id/fleet",
  middleware([
    rolePermissions.READ_VEHICLE_SELF,
    rolePermissions.READ_STS_SELF,
  ]),
  async (req, res) => {
    try {
      const sts_id = parseInt(req.params.id as string);
      const fleet = await fleetOptimizationService(
        sts_id,
        parseInt(res.locals.userId)
      );
      return res.status(200).json(fleet);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

stsRouter.get(
  "/sts/:id",
  middleware([rolePermissions.READ_STS_ALL, rolePermissions.READ_STS_SELF]),
  async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const sts = await getStsService(id);
      return res.status(200).json(sts);
    } catch (error) {
      const err = getErrorType(error);
      return res.status(err.errorCode).json({ message: err.message });
    }
  }
);

export default stsRouter;