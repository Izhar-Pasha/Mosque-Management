import { jest } from "@jest/globals";

await jest.unstable_mockModule("../../models/professionalModel.js", () => ({
  Professional: {
    find: jest.fn(),
  },
}));

const { getProfessional } = await import(
  "../../controllers/professionalController.js"
);
const { Professional } = await import("../../models/professionalModel.js");
const { AppError } = await import("../../middlewares/errorHandler.js");

describe("getProfessional", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test("should return all the Professionals with status 200", async () => {
    const mockProfessional = [{ name: "Ahmed" }, { name: "Jeelani" }];
    Professional.find.mockResolvedValue(mockProfessional);

    await getProfessional(req, res, next);

    expect(Professional.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      allProfessional: mockProfessional,
      message: "Successfully fetched professional",
    });
  });

  test("should call next with error if Professional.find throws", async () => {
    const error = new Error("Database Error");
    Professional.find.mockRejectedValue(error);

    await getProfessional(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test("should call next if Professional.find is null", async () => {
    Professional.find.mockResolvedValue(null);

    await getProfessional(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].message).toBe("Failed to get professional");
  });
});
