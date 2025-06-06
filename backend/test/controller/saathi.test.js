import { beforeEach, describe, jest, test } from "@jest/globals";

const mockSave = jest.fn();
const mockSaathi = jest.fn(() => ({
  save: mockSave,
}));

await jest.unstable_mockModule("../../models/saathiModel.js", () => ({
  Saathi: mockSaathi,
}));

const { createSaathi } = await import("../../controllers/saathiController.js");
// const { Saathi } = await import("../../models/saathiModel.js");
const { AppError } = await import("../../middlewares/errorHandler.js");

describe("Saathi Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        name: "Izhar",
        work: "Software Engineer",
        contact: "1234567891",
        landmark: "Indian School",
        waqt: "40 days",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    mockSave.mockClear(); //Clear Prev mocks
  });

  test("Should save a new Saathi and respond with 201", async () => {
    mockSave.mockResolvedValue();

    await createSaathi(req, res, next);

    expect(mockSaathi).toHaveBeenCalledWith(req.body);
    expect(mockSave).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "New saathi is added" });
  });

  test("should return 400 if the fields are missing", async () => {
    req.body = {};

    await createSaathi(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].message).toBe("All fields are required");
  });

  test("should calls next if save throws error", async () => {
    mockSave.mockRejectedValue(new Error("Database Error"));

    await createSaathi(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
