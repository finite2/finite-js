import "@testing-library/jest-dom/extend-expect";
import { vi } from "vitest";

vi.mock("plot/utils/getID", () => ({
  getID: vi.fn().mockReturnValue("test-id"),
}));
