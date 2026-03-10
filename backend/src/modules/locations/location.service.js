import * as locationRepo from "./location.repository.js";
import { logActivity } from "../../utils/activityLogger.js";

export const createLocation = async (data) => {

  const locationData = {
    latitude: data.latitude,
    longitude: data.longitude,

    buildingName: data.buildingName || null,
    floorNumber: data.floorNumber || null,

    street: data.street || null,
    city: data.city || null,
    state: data.state || null,
    pincode: data.pincode || null,

    zone: data.zone || null,

    radius: data.radius || 100,

    createdBy: data.createdBy || null
  };

  // Create location
  const location = await locationRepo.createLocation(locationData);

  // Activity log
  await logActivity({
    type: "success",
    action: "location_created",
    title: "Location Created",
    detail: location.buildingName || "Location added",
    actorId: locationData.createdBy
  });

  return location;
};

export const listLocations = async () => {
  return locationRepo.getLocations();
};