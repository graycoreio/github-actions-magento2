export const testItWorks = (): string => {
    return "Hello world";
};

if (testItWorks() !== "Hello world") {
    process.exit(1);
}

console.log("E2E test passed");