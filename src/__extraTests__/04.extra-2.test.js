import { renderHook, act } from "@testing-library/react-hooks";
import { useLocalStorage } from "../exercise/04"; // Ensure this is pointing to your exercise file
import "jest-localstorage-mock"; // Make sure this is imported for localStorage mocking

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Exercise 04 - Bonus 2", () => {
  test("updates state after storage events", async () => {
    localStorage.setItem("test", JSON.stringify("old value"));
    const { result } = renderHook(() => useLocalStorage("test", "old value"));

    expect(result.current[0]).toBe("old value");

    const newValue = "new value";
    act(() => {
      localStorage.setItem("test", JSON.stringify(newValue));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "test",
          newValue: JSON.stringify(newValue),
          oldValue: JSON.stringify("old value"),
          url: "http://localhost",
          // REMOVE OR COMMENT OUT THIS LINE:
          // storageArea: localStorage, // <--- This line is causing the error
        })
      );
    });

    expect(result.current[0]).toBe(newValue);
  });

  test("the event handler function is removed when the component unmounts", () => {
    const spy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useLocalStorage("test"));
    unmount();
    expect(spy).toHaveBeenCalledWith("storage", expect.any(Function));
  });
});
