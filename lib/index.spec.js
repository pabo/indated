const { getOutdatedPackageData, tryToParseJson, generateDataTable } = require("./index.js");

jest.mock("child_process", () => {
  return {
    exec: jest.fn()
  }
})

const child_process = require('child_process');
const mockExec = child_process.exec;

beforeEach(() => {
  jest.resetAllMocks();
});

describe("getOutdatedPackageData", () => {
  it("should return a promise", () => {
    const returnValue = getOutdatedPackageData();

    expect(typeof returnValue.then).toBe('function');
    expect(typeof returnValue.catch).toBe('function');
  });

  it("should call child_process.exec with npm outdated command", () => {
    getOutdatedPackageData();

    expect(mockExec.mock.calls[0][0]).toBe("npm outdated --json --silent");
  });
});

describe("tryToParseJson", () => {
  const processExit = process.exit;
  const consoleError = console.error;

  beforeEach(() => {
    process.exit = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    process.exit = processExit;
    console.error = consoleError;
  });

  it("should return with an object of the parsed JSON", () => {
    const mockJsonString = `{"property1":"value1"}`;

    const returnValue = tryToParseJson(mockJsonString);

    expect(returnValue).toEqual({property1: "value1"});
  });

  it("should process.exit(1) with malformed JSON", () => {
    const mockJsonString = `{"property1:"value1"}`;

    const returnValue = tryToParseJson(mockJsonString);

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});

describe("generateDataTable", () => {
  const mockPackageData = {
    "indated": {
      current: "1.0.0",
      latest: "1.0.0"
    },
    "react": {
      current: "15.3.0",
      latest: "16.4.0"
    },
    "jest-enforce": {
      current: "1.0.0",
      latest: "1.0.7"
    },
    "some-minor-package": {
      current: "2.3.4",
      latest: "2.5.0"
    }
  };

  it("should generate data table for major differences", () => {
    const returnValue = generateDataTable({packageData: mockPackageData, major: true, minor: false, patch: false});

    expect(returnValue).toMatchSnapshot();
  });

  it("should generate data table for minor differences", () => {
    const returnValue = generateDataTable({packageData: mockPackageData, major: false, minor: true, patch: false});

    expect(returnValue).toMatchSnapshot();
  });

  it("should generate data table for patch differences", () => {
    const returnValue = generateDataTable({packageData: mockPackageData, major: false, minor: false, patch: true});

    expect(returnValue).toMatchSnapshot();
  });

  it("should generate data table for all differences", () => {
    const returnValue = generateDataTable({packageData: mockPackageData, major: true, minor: true, patch: true});

    expect(returnValue).toMatchSnapshot();
  });
});