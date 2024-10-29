import { Hono } from "hono";
import * as EdibilityService from "./edibility.service";
import {
  EdibilityCategoryResponse,
  EdibilityCategoriesResponse,
  EdibilityCategoryDeleteResponse,
  EdibilityCategoryCreate,
} from "./edibility.types";

const edibilityRouter = new Hono();

edibilityRouter.get("/", async (c) => {
  const categories = await EdibilityService.findAll();
  const response: EdibilityCategoriesResponse = {
    message: "Successfully get all data edibility categories.",
    data: categories,
  };

  return c.json(response);
});

edibilityRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const category = await EdibilityService.findById(id);

  console.log("category: ", category);
  const response: EdibilityCategoryResponse = {
    message: category
      ? "Get an edibility category is sucessfully"
      : "Edibility category is not found",
    data: category!,
  };

  return c.json(response);
});

edibilityRouter.post("/", async (c) => {
  const rawBody = await c.req.parseBody();

  const body: EdibilityCategoryCreate = {
    category: String(rawBody.category),
    description: String(rawBody.description),
  };

  if (!body.category || !body.description) {
    const errResponse = {
      error: "Missing required fields",
      message: "Category and description are required",
    };

    return c.json(errResponse, 400);
  }

  const category = await EdibilityService.create(body);

  const response: EdibilityCategoryResponse = {
    message: "Create edibility category is successfully",
    data: category,
  };

  return c.json(response, 201);
});

edibilityRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const rawBody = await c.req.parseBody();

  const body: EdibilityCategoryCreate = {
    category: String(rawBody.category),
    description: String(rawBody.description),
  };

  const category = await EdibilityService.update(id, body);

  const response: EdibilityCategoryResponse = {
    message: "Update data edibility category is sucessfully",
    data: category,
  };

  return c.json(response);
});

edibilityRouter.delete("/:id", async (c) => {
  const edibilityId = c.req.param("id");

  await EdibilityService.remove(edibilityId);

  const response: EdibilityCategoryDeleteResponse = {
    message: `Deleted ${edibilityId} successfully`,
  };

  return c.json(response);
});

export default edibilityRouter;
