export const committeeLoadRoutes = async () => {
  let components = [];
  try {
    let { AppShared } = await import("@4eplatform/shared");
    components.push(AppShared);
  } catch (error) {
    console.error("Error loading shared:", error);
  }

  try {
    let { Committees } = await import("@4eplatform/committees");
    components.push(Committees);
  } catch (error) {
    console.error("Error loading committees:", error);
  }

  try {
    let { Connect } = await import("@4eplatform/connect");
    components.push(Connect);
  } catch (error) {
    console.error("Error loading Connect:", error);
  }

  return components;
};
