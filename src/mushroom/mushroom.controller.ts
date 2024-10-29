import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import * as MushroomService from "./mushroom.service";
import {
  MushroomResponse,
  MushroomsResponse,
  MushroomDeleteResponse,
  CreateMushroomRequest,
  UpdateMushroomRequest,
} from "./mushroom.types";

const mushroomRouter = new Hono();

mushroomRouter.get("/", async (c) => {
  const mushrooms = await MushroomService.findAll();
  const response: MushroomsResponse = {
    message: "Successfully get all mushrooms",
    data: mushrooms,
  };
  return c.json(response);
});

mushroomRouter.get("/by-family/:familyId", async (c) => {
  const familyId = c.req.param("familyId");
  const mushrooms = await MushroomService.findByFamily(familyId);
  const response: MushroomsResponse = { message: "success", data: mushrooms };
  return c.json(response);
});

mushroomRouter.get("/edible/:isEdible", async (c) => {
  const isEdible = c.req.param("isEdible") === "true";
  const mushrooms = await MushroomService.findByEdibility(isEdible);
  const response: MushroomsResponse = { message: "success", data: mushrooms };
  return c.json(response);
});

mushroomRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const mushroom = await MushroomService.findById(id);

  if (!mushroom) {
    throw new HTTPException(404, { message: "Mushroom not found" });
  }

  const response: MushroomResponse = {
    message: "Successfully get data mushroom",
    data: mushroom,
  };
  return c.json(response);
});

mushroomRouter.post("/", async (c) => {
  const body = await c.req.json<CreateMushroomRequest>();
  const mushroom = await MushroomService.create(body);
  const response: MushroomResponse = {
    message: "Successfully created a new mushroom data",
    data: mushroom,
  };
  return c.json(response, 201);
});

mushroomRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json<UpdateMushroomRequest>();

  try {
    const mushroom = await MushroomService.update(id, body);
    const response: MushroomResponse = {
      message: "Successfully update data mushroom",
      data: mushroom,
    };
    return c.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new HTTPException(404, { message: "Mushroom not found" });
    }
    throw error;
  }
});

mushroomRouter.delete("/:id", async (c) => {
  const mushroomId = c.req.param("id");

  try {
    await MushroomService.remove(mushroomId);

    const response: MushroomDeleteResponse = {
      message: `Deleted ${mushroomId} successfully`,
    };
    return c.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      throw new HTTPException(404, { message: "Mushroom not found" });
    }
    throw error;
  }
});

export default mushroomRouter;
