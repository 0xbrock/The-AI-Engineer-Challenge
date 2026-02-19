import "@testing-library/jest-dom";

// jsdom doesn't implement scrollIntoView; mock it for tests
Element.prototype.scrollIntoView = jest.fn();
