import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck = asyncHandler(async (req, res) => {
  const DatabaseStatus =
    mongoose.connection.readyState === 1
      ? "Database Connected"
      : "Database Disconnected";
  const ServerUptime = `${process.uptime().toFixed(2)} seconds`;
  const message = "Health check passed";
  if (!DatabaseStatus) {
    message + " but database connection not established properly.";
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        DatabaseStatus,
        ServerUptime,
      },
      message
    )
  );
});

export { healthcheck };
