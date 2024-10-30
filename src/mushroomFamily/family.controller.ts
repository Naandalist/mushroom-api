import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as FamilyService from "./family.service";
import {
  MushroomFamilyResponse,
  MushroomFamiliesResponse,
  MushroomFamilyDeleteResponse,
  CreateMushroomFamilyRequest,
} from "./family.types";

const familyRouter = new Hono();

familyRouter.get("/", async (c) => {
  const families = await FamilyService.findAll();

  console.log("families: ", families);
  const response: MushroomFamiliesResponse = {
    message: "Successfully get all data  families.",
    data: families,
  };
  return c.json(response);
});

familyRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const family = await FamilyService.findById(id);

  if (!family) {
    throw new HTTPException(404, {
      message: "Mushroom family not found",
    });
  }

  const response: MushroomFamilyResponse = {
    message: "Get a mushroom family is sucessfully",
    data: family,
  };
  return c.json(response);
});

familyRouter.post("/", async (c) => {
  const rawBody = await c.req.parseBody();

  const body: CreateMushroomFamilyRequest = {
    familyName: String(rawBody.familyName),
  };

  const family = await FamilyService.create(body);

  const response: MushroomFamilyResponse = {
    message: "Successfully created new family",
    data: family,
  };
  return c.json(response, 201);
});

familyRouter.put("/:id", async (c) => {
  const familyId = c.req.param("id");
  const rawBody = await c.req.parseBody();

  const body: CreateMushroomFamilyRequest = {
    familyName: String(rawBody.familyName),
  };

  try {
    const family = await FamilyService.update(familyId, body);
    const response: MushroomFamilyResponse = {
      message: "Successfully update data family",
      data: family,
    };
    return c.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new HTTPException(404, { message: "Mushroom family not found" });
    }
    throw error;
  }
});

familyRouter.delete("/:id", async (c) => {
  const familyId = c.req.param("id");

  try {
    await FamilyService.remove(familyId);
    const response: MushroomFamilyDeleteResponse = {
      message: "Deleted successfully",
    };
    return c.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new HTTPException(404, { message: "Mushroom family not found" });
    }
    throw error;
  }
});

export default familyRouter;
