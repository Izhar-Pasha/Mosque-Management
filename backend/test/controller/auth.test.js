import { jest } from "@jest/globals";

await jest.unstable_mockModule("../../models/userModel.js", () => ({
  User: {
    find: jest.fn(),
  },
}));

const { getAdmin } = await import("../../middlewares/auth.js");
const { User } = await import("../../models/userModel.js");
const { AppError } = await import("../../middlewares/errorHandler.js");

describe("getAdmin controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should return all the users with status code 200", async () => {
    const mockUsers = [{ name: "Izhar" }, { name: "Rahzi" }];
    User.find.mockResolvedValue(mockUsers);

    await getAdmin(req, res, next);

    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      allUsers: mockUsers,
      message: "Successfully got the admins",
    });
  });

  test("should call next with error if User.find throws", async () => {
    const error = new Error("Database Error");
    User.find.mockRejectedValue(error);

    await getAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test("should call next if User.find is null", async () => {
    User.find.mockResolvedValue(null);

    await getAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].message).toBe("failed to get all users");
  });
});
