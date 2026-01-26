const DynamicComponentsWrapper = ({ components }: any) => {
  return (
    <>
      {components?.map((Component: any, index: number) => (
        <Component key={index} />
      ))}
    </>
  );
};

export default DynamicComponentsWrapper;
